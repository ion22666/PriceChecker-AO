const fs = require("fs");
const sass = require("sass");
const chalk = require("chalk");
const stylelint = require("stylelint");

var error_state = false;

const files = [
    // {
    //     input: "./src/client/styles/app.scss",
    //     output: "./dist/assets/styles/app.css",
    //     compiling: false,
    // },
    {
        input: "./src/client/styles/app1.scss",
        output: "./dist/assets/styles/app1.css",
        compiling: false,
    },
    // {
    //     input: "./src/client/styles/app2.scss",
    //     output: "./dist/assets/styles/app2.css",
    //     compiling: false,
    // },
];

// Compile .scss file to a .css file
const compile = async file => {
    if (file.compiling) return;
    file.compiling = true;
    try {
        let { css } = sass.compile(file.input, {});
        let output = (
            await stylelint.lint({
                code: css,
                config: {
                    extends: "stylelint-config-standard",
                    rules: {
                        "no-missing-end-of-source-newline": null,
                    },
                },
            })
        ).results[0];
        if (output.errored) {
            console.log(chalk.bold.redBright.bgHex("#000")("---------- Error in " + chalk.cyanBright(file.input) + " -------------"));
            output.warnings.forEach(warning => {
                console.log(chalk.bold.yellow("LINE: ") + warning.line);
                console.log(chalk.bold.magenta("COLUMN: ") + warning.column);
                console.log(chalk.bold.bgHex("#000")(chalk.bold("MESSAGE: ") + chalk.bold.yellowBright(warning.text)));
                console.log(chalk.bold.redBright.bgHex("#000")("-----------------------------------------------------------"));
            });
        } else {
            console.log(chalk.greenBright.bgHex("#000")(chalk.cyanBright(file.input) + " has compiled successfully"));
            fs.writeFileSync(file.output, css);
        }
        file.compiling = false;
    } catch (err) {
        file.compiling = false;
        console.log(chalk.bold.redBright.bgHex("#000")(err));
    }
};

// Initial compilation
files.forEach(compile);

files.forEach(file => {
    fs.watch(file.input, () => {
        compile(file);
    });
});
