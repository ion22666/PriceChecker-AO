const fs = require("fs");
const sass = require("sass");
const validateCss = require("css-validator");
const chalk = require("chalk");

const files = [
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
    let result = sass.compile(file.input);
    validateCss({ text: result.css }, (err, data) => {
        if (data.validity) {
            console.log(chalk.green(file.input + " has compiled successfully"));
            fs.writeFileSync(file.output, result.css);
        } else {
            console.log(chalk.bold.redBright("--------------Error in " + chalk.cyanBright(file.input) + "------------------"));
            data.errors.forEach(error => {
                console.log(chalk.bold.yellow("LINE: ") + error.line);
                console.log(chalk.bold.magenta("ERRORTYPE: ") + error.errortype);
                console.log(chalk.bold.bgHex("#010101")(chalk.bold("MESSAGE: ") + chalk.bold.yellowBright(error.message.trimStart())));
            });
        }
    });
    file.compiling = false;
};

// Initial compilation
files.forEach(compile);

files.forEach(file => {
    fs.watch(file.input, () => {
        compile(file);
    });
});
