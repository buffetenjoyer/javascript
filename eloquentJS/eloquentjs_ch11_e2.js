const fsPromises = require('fs/promises');

function activityTable(day) {
    let prom = new Promise(resolve => {resolve(fsPromises.readFile("camera_logs.txt", {encoding: 'utf8'}))})
    .then(fileAsString => {console.log(fileAsString); return fileAsString})

    .then(fileAsString => {console.log(fileAsString.split("\r\n")); return fileAsString.split("\r\n")});

    let hoursArray = []; for (let j = 0; j < 24; j++) {hoursArray.push(0);} console.log(hoursArray); 

    console.log("im here");
    prom.then(subFileArray => {
        console.log(subFileArray);
        for (let subFile of subFileArray) {
        console.log(subFile);
        let prom2 = new Promise (resolve => resolve(fsPromises.readFile(subFile, {encoding: 'utf8'})));


        prom2.then(subFileAsString => subFileAsString.split("\r\n"))
        .then(timesArray => {console.log(timesArray); return timesArray})
        
        .then(timesArray => {
            console.log(timesArray.map(time => {let date = new Date(Number(time)); return date})); return timesArray
        }
        )
        
        //console.log(timesArray.map(time => {let date = new Date(Number(time)); return date.getDay()}));
        //console.log(timesArray.map(time => {let date = new Date(Number(time)); return date.getHours()}));

        .then(timesArray => timesArray.filter(time => {let date = new Date(Number(time)); return date.getDay() == day}))
        
        .then(thatDayArray => {if (thatDayArray.length != 0) {
            console.log(thatDayArray.length);
            thatDayArray.reduce((total,time) => {let date = new Date(Number(time)); hoursArray[date.getHours()]++; return null}, null);
            console.log(hoursArray);
        }})
        /*
        let thatDayArray = timesArray.filter(time => {let date = new Date(Number(time)); return date.getDay() == day});
        if (thatDayArray.length != 0) {
            console.log(thatDayArray.length);
            thatDayArray.reduce((total,time) => {let date = new Date(Number(time)); hoursArray[date.getHours()]++; return null}, null);
        }
            */
        }
        return hoursArray;
        //return hoursArray;
        
    }
    )
    /*
    let subFileArray = fileAsString.split("\r\n");

    let hoursArray = [];
    for (let j = 0; j < 24; j++) {
        hoursArray.push(0);
    }

    for (let subFile of subFileArray) {

        let subFileAsString = await fsPromises.readFile(subFile, {encoding: 'utf8'});


        let timesArray = subFileAsString.split("\r\n");
        console.log(timesArray);
        console.log(timesArray.map(time => {let date = new Date(Number(time)); return date}));
        //console.log(timesArray.map(time => {let date = new Date(Number(time)); return date.getDay()}));
        //console.log(timesArray.map(time => {let date = new Date(Number(time)); return date.getHours()}));

        let thatDayArray = timesArray.filter(time => {let date = new Date(Number(time)); return date.getDay() == day});
        if (thatDayArray.length != 0) {
            console.log(thatDayArray.length);
            thatDayArray.reduce((total,time) => {let date = new Date(Number(time)); hoursArray[date.getHours()]++; return null}, null);
        }

    }
    return hoursArray;
    */
    return prom;
    
}
function generateRandomActivity(numOfFiles) {
    let dat = new Date();
    for (let i = 0; i < numOfFiles; i++) {
        //let fileString = "";
        for (let j = 0; j < 50; j++) {
            randMillisecondPast7Days = dat.getTime() - Math.round(Math.random()*1000*60*60*24*7);
            let moment = new Date(randMillisecondPast7Days);
            console.log(randMillisecondPast7Days);
            //fileString += randMillisecondPast7Days + "\r\n";
        }
        console.log();
    }
}

//generateRandomActivity(4);


//let blob = new Blob([fileString], {type: 'text/plain'});
//let file = new File([blob], "camera_logs.txt", {type: 'text/plain'});
//console.log(dat.getTime());
console.log(activityTable(0));             // remember, the dates are printed in UTC time but the Date class defualt getter Methods (ex: getHours())  use local time (your time) (your time is 4 hours behind UTC, ex: my time 1:26 PM (13:26) 7/4/2025, UTC time would be 5:26 PM (17:26) 7/4/2025)
console.log("hehe"); 
// console.log(new Date(0));
// console.log(new Date(0).getUTCHours());
// console.log(new Date(0).getHours());
//console.log(dat.getDay());


