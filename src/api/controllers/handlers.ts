import { Handler } from "express";
import { collections } from "../config/mongodb";
import { StaticDir } from "../config/paths";
import { ExtendItem } from "../models/item";

export const app: Handler = (req, res) => {
    res.status(200).sendFile(StaticDir + "html\\index.html");
};

export const api = {
    index: ((req, res) => {
        res.status(200).json({ message: "Api Page" });
    }) as Handler,
    items: (async (req, res) => {
        //findOne({ UniqueName: "UNIQUE_HIDEOUT" })
        let item = ExtendItem(
            await (
                await collections
            ).items.findOne({
                $or: [{ UniqueName: req.params.unique_name }, { "LocalizedNames.EN-US": req.params.unique_name }],
            })
        );
        if (item) {
            res.status(200).json({ status: "OK", data: { ...item, img_url: item.get_img_url() } });
        } else {
            res.status(404).json({ status: "ERROR", error: "Item Not Found" });
        }
    }) as Handler,
};
