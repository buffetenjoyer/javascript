//  Chapter 6 Excercise 3

class Group {
    constructor() {
        this.parts = [];
    }

    add(x) {
        if (!this.has(x)) {
            this.parts.push(x);
        }
    }

    delete(x) {
        if (this.has(x)){
            this.parts = this.parts.slice(0,this.parts.indexOf(x)).concat(this.parts.slice(this.parts.indexOf(x)+1));
        }
    }

    has(x) {
        if (this.parts.indexOf(x) == -1) {
            return false;
        }
        else {
            return true;
        }
    }

    static from(someIterable) {
        let group = new Group()
        for (let item of someIterable) {
            group.add(item);            
        }
        return group;
    }

}


//  Chapter 6 Excercise 3            (make sure you run previous block first, this block depends on previous block (Chapter 6 Excercise 2))


class GroupButIterable extends Group {

    constructor() {
        super();
        this.currentIndex = 0;
    }

    get Iterator() {
        let index = this.currentIndex;
        let parts = this.parts;
        //console.log(super.add);                   // not undefined, print the toString of add function from superclass Group: "[Function: add]"
        return { 
            next() {
                //console.log(super.add);           // prints undefined, not %100 sure why
                if (index == parts.length) {
                    return {done: true};
                }
                return {value: parts[index++], done: false};
            }
        }
    }

    get partStuff() {
        return this.parts;
    }

    [Symbol.iterator]() {
        return this.Iterator;
    }
    

}
//GroupButIterable.prototype[Symbol.iterator] = GroupButIterable.prototype.partStuff[Symbol.iterator];     // doesn't work, idk why





let testingArray = [1, 4, 3, 2];
console.log(testingArray[Symbol.iterator]);
testingArray[Symbol.iterator] = function() {
    return {
        index: 0,
        next() {
            if (this.index == 4) {
                return {done:true};
            }
            return {value: testingArray[this.index++], done:false};
        }
    }
}
for (let num of testingArray) {
    console.log(num);
}
let group3 = new GroupButIterable();

group3.add(3);
group3.add(1);
group3.add(7);
console.log(group3);
console.log(group3.partStuff);

let itr = group3.Iterator;
console.log(itr.next());
console.log(itr.next());
console.log(itr.next());
console.log(itr.next());
console.log(itr.next());





let group4 = new GroupButIterable();
group4.add(7);
group4.add(5);
group4.add(2);

group4[Symbol.iterator] = function() {
    return group4.Iterator;
}

for (let item of group4) {
    console.log(item);
}

console.log("-------------------")

let group5 = new GroupButIterable();

group5.add(1);
group5.add(62);
group5.add(73);
group5.add(1);
group5.add("herro");
group5.delete("62");
group5.delete(73);

/*GroupButIterable.prototype[Symbol.iterator] = function() {        // this way doesn't work, idk why
    return GroupButIterable.prototype.Iterator;                     
}*/

//GroupButIterable.prototype[Symbol.iterator] = function() {          // this version works though, added it inside the class instead of putting it here
//    return this.Iterator;                   
//}
for (let item of group5) {
    console.log(item);
}

