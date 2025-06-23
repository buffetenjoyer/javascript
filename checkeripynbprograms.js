//     Chapter 8 Excercise 1

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(x, y) {
    let rand = Math.random();
    if (rand < 0.2) {
        return (x*y);
    }
    else {
        throw new MultiplicatorUnitFailure();
    }
}
function retry(x,y) {
    for (;;) {
        try {
            //let z = a+b;                // uncommenting this line will cause an exception as the variable a is not defined, and this exception will go inside the else part of the catch block and 
                                          // be rethrown, as it is not of the type MultiplicatorUnitFailure. This goes along exactly what we wanted: only MultiplicatorUnitFailure exceptions should be getting caught and handled.
            return primitiveMultiply(x,y);
        }
        catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.log("multiplier error");
            }
            else {
                throw e;
            }
        }
    }
}

console.log(retry(2,3));

console.log(retry(2,3));

console.log(retry(2,3));

console.log(retry("abc", console.log));

