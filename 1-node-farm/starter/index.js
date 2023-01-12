const fs = require("fs");
// console.log("fs :>> ", fs);

const textInput = fs.readFileSync("./txt/input.txt", "utf-8");

console.log("textInput :>> ", textInput);

const textOutput = `${textInput}. I like avocados to much. \nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/input.txt", textOutput);

console.log("textOutput :>> ", textOutput);
