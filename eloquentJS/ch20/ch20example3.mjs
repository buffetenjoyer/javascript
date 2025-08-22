 import {createServer} from "node:http";
 createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    request.on("data", chunk =>
        response.write(chunk.toString().toUpperCase()));

    request.on("end", () => response.end());
 }).listen(8000);
 console.log("Listening (port 8000)");

fetch("http://localhost:8000/", {
    method: "POST",
    body: "Hello Server"
}).then(resp => resp.text()).then(console.log);