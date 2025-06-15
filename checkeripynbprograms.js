//   Chapter 5 Excercise 3

function every(inputArray, predicateFunction) {
    for (let input of inputArray) {
        if (!predicateFunction(input)) {
            return false;
        }
    }
    return true;
}

function every2(inputArray, predicateFunction) {     
    /*if (!inputArray.some(!predicateFunction())) {   // this would've worked if notated correctly, and the reason it would work is basically set theory: the "every" function is basically the "and" function for arrays
                                                      // and the "some" function is basically the "or" function for arrays. From set theory, we learned that
                                                      // !(A and B) = (!A or !B), and this is equivalent to (A and B) = !(!A or !B). We use the latter (second) equation in our program.
                                                      // The expression !inputArray.some(!predicateFunction()) basically means !(!A or !B or ... or !N) which equals (A and B and ... and N)
                                                      // and that should equal true if and only if the "every" function returns true, and equal false if and only if the "every" function returns false.
                                                      // So we use if statement to make sure the function only returns true if (A and B and ... and N) equals true, and false for otherwise.
        return true;                                    
    }*/

    if (!inputArray.some(i => !predicateFunction(i))) {   // same idea as the code that was commented out (follows same ideas in above comments too), but notated correctly this time
                                                          // the reason why above code creates error is beacuse !predicateFunction() is not a function value, it's actually a boolean value, you can't just put an ! mark in front of a function to make another function/(function value). Maybe you can in other cases (I tested in code block below this one)
        return true;
    }
    return false;
}

console.log(every([1,2,3], i => i < 5));
console.log(every2([1,2,3], i => i < 5));

console.log(every([1,2,3], i => i < 3));
console.log(every2([1,2,3], i => i < 3));

console.log(every(["hi", true, "yes", 17, x => {x < 22}], i => typeof(i) != "object"));
console.log(every2(["hi", true, "yes", 17, x => {x < 22}], i => typeof(i) != "object"));

console.log(every(["hi", true, "yes", 17, x => {x < 22}], i => typeof(i) != "function"));
console.log(every2(["hi", true, "yes", 17, x => {x < 22}], i => typeof(i) != "function"));

