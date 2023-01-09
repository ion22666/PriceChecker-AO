import { Handler } from "express";
import { StaticDir } from "../config/paths";
import Return405 from "../middlewares/Return405";

//--------------/

export default {
    get: (req, res) => {
        res.status(200).sendFile(StaticDir + "html\\index.html");
    },
    all: Return405,
} as {
    get: Handler;
    all: Handler;
};
