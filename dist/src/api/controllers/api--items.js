var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DB from "../config/mongodb";
import { ExtendItem } from "../models/item";
const shema = (lang) => {
    return {
        _id: 0,
        [`LocalizedNames.${lang}`]: 1,
        [`LocalizedDescriptions.${lang}`]: 1,
        UniqueName: 1,
    };
};
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
export default {
    getIndex: (req, res) => {
        res.status(200).json({
            message: "Albion Online Items API",
            content: {
                "Search Item": "/api/items/<unique_name || localized_name>",
                Sources: [
                    "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json",
                    "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
                ],
            },
        });
    },
    get_one: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let localized_item = ExtendItem(yield DB.collections.items.findOne({
            $or: [{ UniqueName: req.params.name }, { [`LocalizedNames.${req.params.lang}`]: req.params.name }],
        }, {
            projection: shema(res.locals.lang),
        }));
        if (localized_item) {
            res.status(200).json({ status: "OK", data: Object.assign(Object.assign({}, localized_item), { img_url: localized_item.get_img_url() }) });
        }
        else {
            res.status(404).json({ status: "ERROR", error: "Item Not Found" });
        }
    }),
    get_many: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let count = parseInt(req.params.count);
            let page = parseInt(req.params.page);
            let category = req.params.categoty || "*";
            let sub_category = req.params.sub_categoty || "*";
            let database = req.query;
            // Parameters validators
            {
                if (count && (count > 100 || count < 0)) {
                    throw new Error("Items counts is not valid");
                }
                if (page && page < 0) {
                    throw new Error("Page number is not valid");
                }
                // if (category && !available_category.includes(category) && category != "*") {
                //     throw new Error("Category Not Valid");
                // }
                // if (sub_category && !available_sub_category[category].includes(category) && sub_category != "*") {
                //     throw new Error("Sub-Category Not Valid");
                // }
            }
            let items;
            if (collection === "A") {
                items = (yield DB.collections.itemsArray
                    .find({ "@shopcategory": "melee", "@shopsubcategory1": "axe" })
                    .limit(10)
                    //.project(shema(res.locals.lang))
                    .toArray());
            }
            else {
                items = yield DB.collections.itemsTree.aggregate([
                    {
                        $project: {
                            "melee.axe": { $slice: ["$melee.axe", 10] },
                        },
                    },
                ]);
            }
            if (items.length === 0) {
                throw new Error("No Items Found");
            }
            items.map((item) => {
                var _a;
                item.img_url = (_a = ExtendItem(item)) === null || _a === void 0 ? void 0 : _a.get_img_url();
            });
            return res.status(200).json({ status: "OK", data: items });
        }
        catch (err) {
            return res.status(400).json({ status: "ERROR", error: err.message });
        }
    }),
};
