import { Handler } from "express";
import * as handlers from "../controllers/handlers";
import fs from "fs";
type route = {
    url: string;
    method: "get" | "post" | "put" | "patch" | "delete" | "all";
    handler: Handler;
};

export default [
    {
        url: "/",
        method: "all",
        handler: handlers.app,
    },
    {
        url: "/favicon.ico",
        method: "get",
        handler: (req, res) => {
            res.writeHead(200, {
                "Content-Type": "image/x-icon",
                "Content-Length": fs.statSync("./dist/assets/favicon.ico").size,
                Connection: "keep-alive",
            });
            fs.createReadStream("./dist/assets/favicon.ico").pipe(res);
        },
    },
    {
        url: "/api",
        method: "all",
        handler: handlers.api.index,
    },
    {
        url: "/api/items/:unique_name?",
        method: "all",
        handler: handlers.api.items,
    },
] as route[];
