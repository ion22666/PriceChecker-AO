import express from "express";
import config from "./config";
import chalk from "chalk";
const app = express();
app.use("/static", express.static("dist/assets"));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Home Page" });
});
app.post("/", (req, res) => {
    console.log(req.params);
    res.status(200).json({ message: req.body });
});
app.all("//", (req, res) => {
});
const server = app.listen(3000, config.mode == "development" ? "127.0.0.1" : "0.0.0.0", () => {
    let host = server.address();
    console.log(chalk.greenBright.bold.bgHex("#000")("Server is running on " + chalk.cyanBright("http://" + host.address + ":" + host.port)));
});
