import { Handler } from "express";
import { StaticDir } from "../config/paths";
import Return405 from "../middlewares/Return405";
import { avalaible_langs } from "./constants";
//--------------/api

export const validators: Handler = (req, res, next) => {
    let res_status = 400;
    try {
        if (req.method.toUpperCase() != "GET" && (res_status = 405)) throw new Error("Method Not Allowed");

        req.query.lang = req.query.lang ? req.query.lang : "EN-US";
        if (req.query.lang != "EN-US" && !avalaible_langs.includes(req.query.lang as string) && (res_status = 400)) throw new Error(`Language Not Supported, supported languages: ${avalaible_langs}`);
    } catch (err) {
        return res.status(res_status).send({ status: "ERROR", reason: (err as Error).message });
    }
    next();
};
