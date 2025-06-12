//  Chapter 4 Excercise 3: 2nd attempt       (gone right)


function arrayToList(inputArray) {
    let front = null;
    function prepend(element, list) {
        let newFront = {
            value: element,
            rest: list
        };
        list = newFront;
        return list;
    }

    for (let i = 0; i < inputArray.length; i++) {
        front = prepend(inputArray[inputArray.length - 1 - i], front);
    }
    return front;
}


let chainOf5 = arrayToList([1,2,3,4,5]);
console.log(chainOf5);

let arrayOf3 = [1,2,3];
console.log(arrayToList(arrayOf3));

console.log(arrayToList([]));

console.log(arrayToList(["hi"]));

console.log(arrayToList(["hi", "there", "dude", "hello"]));


function listToArray(inputList) {
    let outputArray = [];
    function nth(list, index) {
        if (index == 0) {
            return list?.value;
        }
        return nth(list.rest, index - 1);
    }

    for (let i = 0; nth(inputList, i) != undefined; i ++) {
        outputArray.push(nth(inputList, i));
    }
    return outputArray;
}

console.log(listToArray(chainOf5));

let listOfNumbers = {value:7, rest: {         // equivalent to array [7,5,2,3,2]
    value:5, rest: {
        value:2, rest: {
            value: 3, rest: {
                value: 2, rest: null
            }
        }
    }
}}
console.log(listToArray(listOfNumbers));

console.log(listToArray(null));

console.log(listToArray({value: "heeelllo", rest:{value: "bobby", rest: null}}));