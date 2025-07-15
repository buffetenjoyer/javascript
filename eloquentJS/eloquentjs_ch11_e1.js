const fsPromises = require('fs/promises');

async function activityTable(day) {
    let fileAsString = await fsPromises.readFile("camera_logs.txt", {encoding: 'utf8'});
    console.log(fileAsString);
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
activityTable(0).then(console.log);               // remember, the dates are printed in UTC time but the Date class defualt getter Methods (ex: getHours())  use local time (your time) (your time is 4 hours behind UTC, ex: my time 1:26 PM (13:26) 7/4/2025, UTC time would be 5:26 PM (17:26) 7/4/2025)
// console.log(new Date(0));
// console.log(new Date(0).getUTCHours());
// console.log(new Date(0).getHours());
//console.log(dat.getDay());



function probChecker() {    // dad made me make this function for checking probability of an outcome I got from this problem (I got an outcome where there was 8 occurences in one day and they were all in different hours)
                            // so it's like birthday problem: whats the chance of a group of people not having any same birthdays? But in this case, instead of 365 days to choose from, it's 24 days and 8 people in this group. (I think the calculations might be wrong though.)
    let prob = 1;           
    for (let i = 0; i < 8; i++) {
        prob = prob * (1-1/(24-i));          // I think the calculation might be wrong in this line
        console.log(prob);
    }
    console.log(prob);
}