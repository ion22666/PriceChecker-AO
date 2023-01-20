var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import app from "./app";
import config from "./config/server-config";
(() => __awaiter(void 0, void 0, void 0, function* () {
    // await DB.connect();
    const server = app.listen(3000, config.mode == "development" ? "127.0.0.1" : "0.0.0.0", () => {
        let host = server.address();
        console.log(chalk.greenBright.bold.bgHex("#000")("Server is running on " + chalk.cyanBright("http://" + host.address + ":" + host.port)));
    });
}))();
