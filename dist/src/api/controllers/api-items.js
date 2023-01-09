import { collections } from "../config/mongodb";
import Return405 from "../middlewares/Return405";
import { ExtendItem } from "../models/item";
//--------------/api/items
export default {
    getIndex: (req, res) => {
        res.status(200).json({
            message: "Albion Online Items API",
            content: {
                "Search Item": "/api/items/<unique_name || localized_name>",
                Source: [
                    "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json",
                    "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
                ],
            },
        });
    },
    get: async (req, res) => {
        //findOne({ UniqueName: "UNIQUE_HIDEOUT" })
        console.log(req.params.unique_name);
        let item = ExtendItem(await (await collections).items_localized.findOne({
            $or: [{ UniqueName: req.params.unique_name }, { "LocalizedNames.EN-US": req.params.unique_name }],
        }));
        console.log(item);
        if (item) {
            res.status(200).json({ status: "OK", data: { ...item, img_url: item.get_img_url() } });
        }
        else {
            res.status(404).json({ status: "ERROR", error: "Item Not Found" });
        }
    },
    all: Return405,
};
