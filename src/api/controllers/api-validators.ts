import { Handler } from "express";
import { StaticDir } from "../config/paths";
import Return405 from "../middlewares/Return405";
//--------------/api

const avalaible_langs = ["EN-US", "DE-DE", "FR-FR", "RU-RU", "PL-PL", "ES-ES", "PT-BR", "IT-IT", "ZH-CN", "KO-KR", "JA-JP", "ZH-TW", "ID-ID"];

export default {
    lang_validator: (req, res, next) => {
        let lang = (req.query.lang as string | undefined)?.toUpperCase();

        res.locals.lang = !lang ? "EN-US" : avalaible_langs.includes(lang) ? lang : "INVALID";

        if (lang === "INVALID") {
            return res.status(400).json({
                status: "ERROR",
                error: `Language Not Supported, supported languages: "EN-US", "DE-DE", "FR-FR", "RU-RU", "PL-PL", "ES-ES", "PT-BR", "IT-IT", "ZH-CN", "KO-KR", "JA-JP", "ZH-TW", "ID-ID"`,
            });
        }
        next();
    },
    method_validator: (req, res, next) => {
        if (req.method.toUpperCase() != "GET") {
            return Return405(req, res, next);
        }
        next();
    },
} as {
    lang_validator: Handler;
    method_validator: Handler;
};
