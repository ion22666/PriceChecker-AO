import consoleLogging from "./console-logging";
import Return404 from "./Return404";
import favicon from "./favicon";
import express from "express";
import { Handler } from "express-serve-static-core";

export default {
    // !!! using "*" over "" will destroy the value of req.url
    start: [
        ["", consoleLogging], // log to the console every request and also the response ( with a callback )
        ["", favicon], // return facivon.ico if a url ends in /facivon.ico
        ["", express.json()], // if a request has a body, try to parse it to JSON
        ["", express.urlencoded({ extended: true })], // if the request type is 
    ],
    end: [
        ["/", express.static("dist/assets")], // check if the request match a static file
        ["", Return404], // just send a 404 error if the request reach this point
    ],
} as {
    start: [string, Handler][];
    end: [string, Handler][];
};