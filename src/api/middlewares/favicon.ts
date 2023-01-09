import { Handler } from "express";
import { StaticDir } from "../config/paths";

export default (function favicon(req, res, next) {
    if (req.originalUrl.match(/\/favicon\.ico$/)) {
        if (req.method.toUpperCase() === "GET") {
            res.status(200).sendFile(StaticDir + "img\\favicon.ico");
        } else {
            res.status(406).json({ message: "Method Not Allowed" });
        }
    } else {
        next();
    }
} as Handler);
