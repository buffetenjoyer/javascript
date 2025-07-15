//    Chapter 10 Excercise 2


import {buildGraph} from "./graph.js";



const roads2 = [
"Alice's House-Bob's House", "Alice's House-Cabin",
"Alice's House-Post Office", "Bob's House-Town Hall",
"Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm",
"Grete's House-Shop",
"Marketplace-Farm",
"Marketplace-Post Office",
"Marketplace-Town Hall",
];

let arrayOf2ElementArrays = [];
for (let road of roads2) {
    let place = /([^\-]+)-([^\-]+)/;
    let executed;
    if (executed = place.exec(road)) {
        let place1 = executed[1];
        let place2 = executed[2];
        arrayOf2ElementArrays.push([place1,place2]);
    }
    //console.log(executed);
}
//console.log(arrayOf2ElementArrays);


//console.log(roadGraph);

export const roadGraph = buildGraph(arrayOf2ElementArrays);

