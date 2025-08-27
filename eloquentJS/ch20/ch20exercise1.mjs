import {readFile} from "node:fs/promises";
 import {stat, readdir} from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
let regexString = process.argv[2];

let regex = new RegExp(regexString);

let searchArea = process.argv.slice(3);
let foundFiles = [];

let cwd = process.cwd();

async function search(area) {
    let path = resolve(area);
    // console.log(path);
    let stats = await stat(path);
    if (stats.isDirectory()) {
        let parts = await readdir(path);
        for (let part of parts) {
            await search(path + sep + part);
        }
    }
    // If it goes to else part, we know the variable area is a file
    else {
        let fileAsString = await readFile(path);
        if (regex.test(fileAsString)) {
            let relativePath = relative(cwd, path);
            foundFiles.push(relativePath);
        }
    }
}
for (let fileOrDir of searchArea) {
    await search(fileOrDir);
}

console.log(foundFiles.join("\n"));

if (foundFiles.length == 0) {
    console.log("no matches.");
}
