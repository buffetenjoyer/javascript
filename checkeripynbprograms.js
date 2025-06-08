//  Chapter 4 Excercise 1

// part 1

function range(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

console.log(range(17,30));


// part 2

function sum(arrayOfNum) {
    let summation = 0;
    for (let input of arrayOfNum) {
        summation += input;
    }
    return summation;
}

console.log(sum(range(1,10)));


// part 3

function range2(start, end, step = 1) {
    let result = [];
    if (step > 0) {
        for (let i = start; i <= end; i+= step) {
            result.push(i);
        }
    }
    else if (step < 0) {
        for (let i = start; i >= end; i+= step) {
            result.push(i);
        }
    }
    return result;
}


console.log(range2(10, 20, 2));

console.log(range2(33, 41));

console.log(range2(5, -15, -2));

console.log(range2(5, 10, 0));

console.log(range2(5, 2, -1));