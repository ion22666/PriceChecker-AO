import { Handler } from "express";
import { Document, Filter, WithId } from "mongodb";
import DB from "../config/mongodb";
import Return405 from "../middlewares/Return405";
import { available_category, available_sub_category, avalaible_sorts } from "./constants";

// const shema = (lang: string) => {
//     return {
//         _id: 0,
//         [`LocalizedNames.${lang}`]: 1,
//         [`LocalizedDescriptions.${lang}`]: 1,
//         UniqueName: 1,
//     };
// };

// {
//     UniqueName: "UNIQUE_HIDEOUT";
// }
// LocalizedNames = {
//     "EN-US": "Hideout Construction Kit",
//     "DE-DE": "Unterschlupf-Baukasten",
//     "FR-FR": "Kit de construction de repaire",
//     "RU-RU": "Набор для постройки убежища",
//     "PL-PL": "Zestaw do budowy Kryjówki",
//     "ES-ES": "Kit de construcción de escondites",
//     "PT-BR": "Kit de Construção de Esconderijo",
//     "IT-IT": "Kit di costruzione nascondigli",
//     "ZH-CN": "藏身地堡建筑工具包",
//     "KO-KR": "은신처 건설키트",
//     "JA-JP": "隠れ家建設キット",
//     "ZH-TW": "藏身地堡建設工具組",
//     "ID-ID": "Kit Konstruksi Persembunyian",
// };
//--------------/api/items

export const get_one: Handler = async (req, res) => {
    let item = await DB.collections.itemsArray.findOne({
        $or: [{ UniqueName: req.params.name }, { [`LocalizedNames.${req.params.lang}`]: req.params.name }, { "@uniquename": req.params.name }],
    });
    if (item) {
        res.status(200).json({ status: "OK", data: item });
    } else {
        res.status(404).json({ status: "ERROR", error: "Item Not Found" });
    }
};

export const get_variants: Handler = async (req, res) => {
    let raw_name = req.params["unique_name"].slice(2, req.params["unique_name"][req.params["unique_name"].length - 2] === "@" ? req.params["unique_name"].length - 2 : req.params["unique_name"].length);
    let response_obj: { tier: string[]; enchant: string[]; quality: string[] } = { tier: [], enchant: [], quality: [] };

    if (!raw_name) return res.status(200).json(response_obj);

    let regex = new RegExp(`(^T\\d{1})?${raw_name}(@\\d{1})?$`);

    let items = await DB.collections.itemsArray.find({ UniqueName: regex }).project({ _id: 0, UniqueName: 1, "@tier": 1, "@enchantmentlevel": 1, "@maxqualitylevel": 1 }).toArray();
    if (!items.length) {
        return response_obj;
    }
    if (items[0]["@maxqualitylevel"]) {
        response_obj.quality.push(...Array.from({ length: parseInt(items[0]["@maxqualitylevel"]) + 1 }, (_, i) => `${i}`));
    } else {
        response_obj.quality.push("1");
    }
    items.forEach(item => {
        const [, tier = "0", , enchant = "0"] = /^T(\d)_.+?(@(\d))?$/.exec(item.UniqueName) || [0, item["@tier"] ? item["@tier"] : "0", 0, "0"];
        if (!response_obj.tier.find(v => v === tier) && tier !== "0") response_obj.tier.push(tier);
        if (!response_obj.enchant.find(v => v === enchant)) response_obj.enchant.push(enchant);
    });
    response_obj.tier.sort();
    response_obj.enchant.sort();
    response_obj.quality.sort();

    return res.status(200).json(response_obj);
};

function check_param(name: string, value: string | undefined, default_value: string, default_mirror_values?: string[] | null, values?: string[] | null, int_range?: [number, number] | null): string {
    if (!value) {
        return default_value;
    }
    if (default_mirror_values && default_mirror_values.includes(value)) {
        return default_value;
    }
    if (values && !values.includes(value)) throw new Error(name + " is not acceptable");
    if (int_range) {
        try {
            let int_value = parseInt(value);
            if (int_value < int_range[0]) throw new Error(name + " is too small, needs to be in range: " + int_range[0] + "-" + int_range[1]);
            if (int_value > int_range[1]) throw new Error(name + " is too large, needs to be in range: " + int_range[0] + "-" + int_range[1]);
        } catch (e) {
            throw new Error(name + " needs to be a number");
        }
    }
    return value;
}
export const param_validator: Handler = (req, res, next) => {
    let q = req.query;
    try {
        // Individual Checks
        q.count = check_param("Count", q.count?.toString(), "10", null, null, [1, 50]);
        q.page = check_param("Page", q.page?.toString(), "0", null, null, [0, 100]);
        q.enchant = check_param("Enchantent", q["@enchantmentlevel"]?.toString(), "*", ["all", "any"], null, [0, 4]);
        q.tier = check_param("Tier", q.tier?.toString(), "*", ["all", "any"], null, [0, 8]);
        q.quality = check_param("Quality", q.quality?.toString(), "1", ["all", "any"], null, [1, 5]);
        q.sort = check_param("Sort", q.sort?.toString(), "Index", ["all", "any"], avalaible_sorts, null);
        q.search = check_param("Search", q.search?.toString(), "", null, null, null);
        let category = (q.category = check_param("Category", q.category?.toString(), "*", ["all", "any"], available_category, null));
        let sub_category = (q.sub_category = check_param("Sub-Category", q.sub_category?.toString(), "*", ["all", "any"], available_sub_category[category], null));
        let database = (q.database = check_param("Database", q.database?.toString(), "1", null, null, [1, 2]));

        // Group Checks
        if (sub_category != "*" && category == "*") throw new Error("Sub-Category cannot exist without Category");
        if (database == "2" && (category == "*" || sub_category == "*")) throw new Error("The all/any method is only available with database=1");
    } catch (err) {
        return res.status(400).json({ status: "ERROR", reason: (err as Error).message });
    }
    next();
};

export const get_many: Handler = async (req, res) => {
    let q = req.query;
    console.log(q);
    let items: Document[] = [];
    // Read from items-array collection
    if (q.database == "1") {
        let filter: Filter<Document> = {};
        let AddFilter = (property: ItemDocumentProperties, value: string | undefined | object, defaul_value: string, default_filter?: any) => {
            if (value != defaul_value) {
                filter[property] = value;
            } else if (default_filter) {
                filter[property] = default_filter;
            }
        };

        // property to filter | value to filter | if value to filter == default value => use default filter if exists
        AddFilter("@showinmarketplace", "*", "*", { $in: ["true", undefined] });
        AddFilter("@shopcategory", q.category?.toString(), "*", null);
        AddFilter("@shopsubcategory1", q.sub_category?.toString(), "*", null);
        AddFilter("@enchantmentlevel", q.enchant?.toString(), "*", null);
        AddFilter("@tier", q.tier?.toString(), "*", null);
        let reg_exp = new RegExp(q.search!.toString(), "ig");
        // AddFilter("UniqueName", { $regex: reg_exp }, "", null);
        // AddFilter("@uniquename", { $regex: reg_exp }, "", null);
        // AddFilter(`LocalizedNames.${q.lang!.toString()}` as "LocalizedNames", { $regex: reg_exp }, "", null);
        // if (q.category == "mountskin") {
        //     AddFilter("@shopcategory", "*", "*", { $exists: 0 });
        // }
        if (q.tier?.toString() == "0") {
            AddFilter("@tier", "*", "*", { $in: ["0", undefined] });
        }
        if (q.quality?.toString() != "1") {
            AddFilter("@maxqualitylevel", "*", "*", { $exists: 1 });
        }
        items = (await DB.collections.itemsArray
            .aggregate([
                { $match: filter },
                {
                    $match: {
                        $or: [{ UniqueName: reg_exp }, { "@uniquename": reg_exp }, { [`LocalizedNames.${q.lang!.toString()}`]: reg_exp }],
                    },
                },
            ])
            .sort({ [q.sort!.toString()]: 1 })
            .skip(parseInt(q.page!.toString()) * parseInt(q.count!.toString()))
            .limit(parseInt(q.count!.toString()))

            .toArray()) as Document[];

        // Read from items-tree collection
    } else {
        // items = (
        //     await DB.collections.itemsTree
        //         .aggregate([
        //             {
        //                 $project: {
        //                     [`${q.category?.toString()}.${q.sub_category?.toString()}`]: { $slice: [`$${q.category?.toString()}.${sub_category}`, page * count, page * count + count] },
        //                 },
        //             },
        //         ])
        //         .toArray()
        // )[0][q.category as string][q.sub_category as string] as Document[];
    }

    if (items.length === 0) {
        return res.status(404).json({ status: "ERROR", reason: "No Items Found" });
    } else {
        return res.status(200).json({ status: "OK", data: items });
    }
};
