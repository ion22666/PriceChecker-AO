const fs = require("fs");
const sass = require("sass");
const validateCss = require("css-validator");
const chalk = require("chalk");
const { spawn } = require("child_process");
var error_state = false;
const files = [
    {
        input: "./src/client/styles/app.scss",
        output: "./dist/assets/styles/app.css",
        compiling: false,
    },
    {
        input: "./src/client/styles/app1.scss",
        output: "./dist/assets/styles/app1.css",
        compiling: false,
    },
    {
        input: "./src/client/styles/app2.scss",
        output: "./dist/assets/styles/app2.css",
        compiling: false,
    },
];

// Compile .scss file to a .css file
const compile = file => {
    if (file.compiling) return;
    file.compiling = true;
    try {
        let result = sass.compile(file.input);
        validateCss({ text: result.css }, (err, data) => {
            if (error_state) return;
            if (data.validity) {
                console.log(chalk.greenBright.bgHex("#000")(chalk.cyanBright(file.input) + " has compiled successfully"));
                fs.writeFileSync(file.output, result.css);
            } else {
                console.log(chalk.bold.redBright.bgHex("#000")("---------- Error in " + chalk.cyanBright(file.input) + " -------------"));
                data.errors.forEach(error => {
                    console.log(chalk.bold.yellow("LINE: ") + error.line);
                    console.log(chalk.bold.magenta("ERRORTYPE: ") + error.errortype);
                    console.log(chalk.bold.bgHex("#000")(chalk.bold("MESSAGE: ") + chalk.bold.yellowBright(error.message.trimStart())));
                    console.log(chalk.bold.redBright.bgHex("#000")("-----------------------------------------------------------"));
                });
            }
            file.compiling = false;
        });
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
