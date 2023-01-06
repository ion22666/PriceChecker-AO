import express from "express";
import config from "./config/server-config";
import chalk from "chalk";
import routes from "./routes/routes";
import ConsoleLogger from "./middlewares/console-logging";
import Return404 from "./middlewares/Return404";
export const app = express();
// Define middleware functions
app.use(express.json());
app.use("/media", express.static("dist/assets"));
app.use(ConsoleLogger);
// Define routes
routes.forEach(route => {
    app[route.method](route.url, route.handler);
});
app.use(Return404);
const server = app.listen(3000, config.mode == "development" ? "127.0.0.1" : "0.0.0.0", () => {
    let host = server.address();
    console.log(chalk.greenBright.bold.bgHex("#000")("Server is running on " + chalk.cyanBright("http://" + host.address + ":" + host.port)));
});
