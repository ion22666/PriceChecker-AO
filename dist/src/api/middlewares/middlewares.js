import consoleLogging from "./console-logging";
import Return404 from "./Return404";
import favicon from "./favicon";
import express from "express";
import config from "../config/server-config";
const middlawares = {
    // !!! using "*" over "" will destroy the value of req.url
    start: [
        ["", favicon],
        ["", express.json()],
        ["", express.urlencoded({ extended: true })], // if the request type is
    ],
    end: [
        ["/", express.static("dist/assets")],
        ["", Return404], // just send a 404 error if the request reach this point
    ],
};
if (config.mode == "development")
    middlawares.start.unshift(["", consoleLogging]); // log to the console every request and also the response ( with a callback )
export default middlawares;
