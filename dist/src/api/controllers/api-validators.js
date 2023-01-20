import Return405 from "../middlewares/Return405";
//--------------/api
const avalaible_langs = ["EN-US", "DE-DE", "FR-FR", "RU-RU", "PL-PL", "ES-ES", "PT-BR", "IT-IT", "ZH-CN", "KO-KR", "JA-JP", "ZH-TW", "ID-ID"];
export default {
    lang_validator: (req, res, next) => {
        var _a;
        let lang = (_a = req.query.lang) === null || _a === void 0 ? void 0 : _a.toUpperCase();
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
};
