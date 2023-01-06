import { Handler } from "express";
import { StaticDir } from "../config/paths";

export default ((req, res, next) => {
    res.status(404).sendFile(StaticDir + "html\\404.html");
}) as Handler;
