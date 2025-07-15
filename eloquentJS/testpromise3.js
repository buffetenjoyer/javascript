let prom = new Promise(resolve => {
    console.log("hi");
    resolve("Bye");
}).then(console.log);
throw new Error("hello");