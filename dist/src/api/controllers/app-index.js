import { StaticDir } from "../config/paths";
import Return405 from "../middlewares/Return405";
//--------------/
export default {
    get: (req, res) => {
        return res.status(200).sendFile(StaticDir + "html/index.html");
    },
    all: Return405,
};
