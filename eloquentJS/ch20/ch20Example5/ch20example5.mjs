import {createServer, request} from "node:http";
import {Readable} from "node:stream";

const methods = Object.create(null);
createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request).catch(error => {
        if (error.status != null) return error;
        return {body: String(error), status: 500};
    }).then(({body, status = 200, type = "text/plain"}) => {
        response.writeHead(status, {"Content-Type": type});
        if (body?.pipe) {body.pipe(response); console.log("triggered!!!")}
        else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`
    };
}

import {resolve, sep} from "node:path";

const baseDirectory = process.cwd();

function urlPath(url) {
    console.log("url: ", url);
    let {pathname} = new URL(url, "http://beebeebooboo");
    let path = resolve(decodeURIComponent(pathname).slice(1));           // decodeURIComponent() is a function that just transforms URLs/paths
                                                                         // with escape patterns enabled to their unescaped form
    console.log("long: ", decodeURIComponent(pathname));
    console.log("short: ", path);
    if (path != baseDirectory &&
           !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: "Forbidden"};
    }
    return path;
}

import {createReadStream} from "node:fs";
 import {stat, readdir} from "node:fs/promises";
 import {lookup} from "mime-types";

 methods.GET = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        else {console.log("NONEXISTANT!!!"); return {status: 404, body: "File not found"}};
    }
    if (stats.isDirectory()) {
        return {body: (await readdir(path)).join("\n")};
    } else {
        return {body: createReadStream(path),
        type: lookup(path)};
    }
 };

 import {rmdir, unlink} from "node:fs/promises";
 methods.DELETE = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);                  // stat() is function that tells you whether a path is/leads to a file or directory
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        else return {status: 204};
    }
    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);                       // unlink() is a function that removes a file based on path
    return {status: 204};
 };

  import {createWriteStream} from "node:fs";
 function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);               // .on() is event handler-like function
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);                           // pipe() is a function that transfers data/text from readable stream to writable stream
                                                // Example: A.pipe(B) means data is being read from A and is being written onto B; in order 
                                                // for this to work, A must be a readable stream and B must be a writable stream
    });
 }
 
 methods.PUT = async function(request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
 };

 fetch("http://localhost:8000/", {
    method: "POST",
    body: "Hello Server"
}).then(resp => resp.text()).then(console.log);