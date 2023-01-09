import consoleLogging from "./console-logging";
import Return404 from "./Return404";
import favicon from "./favicon";
import express from "express";
export default {
    // !!! using "*" over "" will destroy the value of req.url
    start: [
        ["", consoleLogging],
        ["", favicon],
        ["", express.json()], // if a request has a body, try to parse it to JSON
    ],
    end: [
        ["/", express.static("dist/assets")],
        ["", Return404], // just send a 404 error if the request reach this point
    ],
};
