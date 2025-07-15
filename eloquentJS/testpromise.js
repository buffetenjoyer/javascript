const fsPromises = require('fs/promises');

async function activityTable(day) {
    let prom = new Promise(resolve => {resolve(fsPromises.readFile("camera_logs.txt", {encoding: 'utf8'}))})
    .then(fileAsString => {console.log(fileAsString); return fileAsString})

    .then(fileAsString => {console.log(fileAsString.split("\r\n")); return fileAsString.split("\r\n")});

    let hoursArrayPromise = new Promise(
        resolve => {resolve( () => {let hoursArray = []; for (let j = 0; j < 24; j++) {hoursArray.push(0);} return hoursArray})}
    );
    console.log("im here");
    
}

await activityTable(0);