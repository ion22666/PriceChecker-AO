import { Handler } from "express";
import { StaticDir } from "../config/paths";
import Return405 from "../middlewares/Return405";

//--------------/api

export default {
    get: (req, res) => {
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
} as {
    get: Handler;
};
