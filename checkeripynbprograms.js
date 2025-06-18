//   Chapter 6 Excercise 2


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

let underlying = [];

underlying.push(1);
console.log(underlying);
underlying.push(1);
console.log(underlying);
console.log(underlying.indexOf(1));
console.log(underlying.indexOf(2));

underlying.push(5);
console.log(underlying.slice(1));
console.log(underlying.slice(0, 1));
console.log(2 == "2");
console.log("------------------");


let group1 = new Group();

group1.add(1);
group1.delete(2);
group1.add(2);
group1.add(3);
group1.delete(2);
group1.add(1);
group1.add("1");
group1.delete("1");
console.log(group1.has(3));
console.log(group1.has(2));
console.log(group1.parts);


let underlying2 = ["happy", "happy", "happie", "ding", 2, 6, 1, 2, "2", "5", "2"];

let group2 = Group.from(underlying2);

console.log(group2);

