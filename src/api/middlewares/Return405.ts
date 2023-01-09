import { Handler } from "express";
import { StaticDir } from "../config/paths";

export default ((req, res) => {
    res.status(405).sendFile(StaticDir + "html\\405.html");
}) as Handler;
