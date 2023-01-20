import * as path from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const mode = "development";

const options = {
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

export default [
    // CSS bundle
    {
        mode: "development",
        entry: {
            client: "./src/client/styles/app.scss",
        },
        output: {
            path: path.resolve(dirname, "./dist/assets/styles"),
            filename: "app.css.js",
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: ".",
                                name: "app.css",
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
    },
    // Client-side bundle
    {
        mode: mode,
        entry: {
            client: "./src/client/index.tsx",
            test: "./src/client/index_test.tsx",
        },
        output: {
            path: path.resolve(dirname, "./dist/assets/scripts"),
            filename: "[name].js",
        },
        module: {
            rules: [
                // Use ts-loader to transpile TypeScript and JSX/React code
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                // Use Babel to transpile the resulting JSX code
                {
                    test: /\.jsx?$/,
                    use: "babel-loader",
                    exclude: /node_modules\/(?!(react|react-dom))/, ///mode === "development" ? /node_modules\/(?!(react|react-dom))/ : /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
    },

    // Server-side bundle
    {
        mode: mode,
        entry: {
            server: "./src/api/server.ts",
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
