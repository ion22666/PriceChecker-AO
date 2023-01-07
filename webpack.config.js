import * as path from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const mode = "production";

const options = {
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

export default [
    // Client-side bundle
    {
        mode: mode,
        entry: {
            client: "./src/client/app.jsx",
        },
        output: {
            path: path.resolve(dirname, "./dist"),
            filename: "client.js",
        },
        module: {
            rules: [

                // Use Babel to transpile the resulting JSX code
                {
                    test: /\.jsx?$/,
                    use: "babel-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
    },
    
    // Server-side bundle
    {
        mode: mode,
        entry: {
            server: "./src/api/index.ts",
        },
        output: {
            path: path.resolve(dirname, "./dist"),
            filename: "server.cjs",
        },
        module: {
            rules: [
                // Use ts-loader to transpile TypeScript code
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
        ...options,
    },
];
