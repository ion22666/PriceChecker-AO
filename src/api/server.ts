import chalk from "chalk";
import app from "./app";
import config from "./config/server-config";
import DB from "./config/mongodb";

(async (): Promise<void> => {
    await DB.connect();
    const server = app.listen(3000, config.mode == "development" ? "127.0.0.1" : "0.0.0.0", () => {
        let host = server.address() as AddressInfo;
        console.log(chalk.greenBright.bold.bgHex("#000")("Server is running on " + chalk.cyanBright("http://" + host.address + ":" + host.port)));
    });
})();
