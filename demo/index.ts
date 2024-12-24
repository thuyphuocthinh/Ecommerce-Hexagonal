// interface User {
//     name: String;
//     age: Number;
// }

// const Nam: User = {
//     name: "Nam",
//     age: 21
// }

// class Student {
//     name: String;
//     age: Number;
//     constructor(name: String, age: Number) {
//         this.name = name;
//         this.age = age;
//     }
// }

// const myBigInt: bigint = 12471895789812n;
// console.log("myBigInt:::", myBigInt);

// const listUser: User[] = [
//     {name: "Thinh", age: 22},
//     {name: "Hai", age: 22}
// ]

// console.log(listUser);
// // array
// // tuple - special array (define length and type for each element)
// const readOnly : number = 10;
// const place: String = "Vietnam";

// const sum = (a: number, b: number): number => {
//     return a + b;
// }

// const printFunction = (input: any): void => {
//     console.log(input);
// }

// // this keyword
// function* range(start: number, end: number): Generator {
//     for (let i = start; i <= end; i++) {
//       yield i;
//     }
// }

// const numbers = range(1, 5);
// // range(1, 5) returns an iterator
// console.log(numbers.next().value); // 1
// console.log(numbers.next().value); // 2
// console.log(numbers.next().value); // 3

// OOP
abstract class Animal {
    private name!: String;
    private age!: Number;
    constructor(name: String, age: Number) {
        this.name = name;
        this.age = age;
    }
    public abstract go(): void;
    public abstract birth(): void;
    public abstract print(): void;
    public getName(): String {
        return this.name;
    }
    public getAge(): Number {
        return this.age;
    }
    public abstract makeSound(sound1: String): void;
    public sex(): void {
        console.log("Have sex");
    }
}

class Dog extends Animal {
    private type: String;
    constructor(type: String, name: String, age: Number) {
        super(name, age);
        this.type = type;
    }
    public go(): void {
        console.log(">>> Dog is running")
    }
    public birth(): void {
        console.log(">>> Dog is giving a birth");
    }
    public print(): void {
        console.log(`${this.getName()} is ${this.getAge()} years old`);
    }
    public makeSound(sound1: String): void {
        console.log(`Make 1 sound ${sound1}`);
    }
    public sex(): void {
        console.log("Dog has sex");
    }
}

class Cat extends Animal {
    constructor(name: String, age: Number) {
        super(name, age);
    }

    public go(): void {
        console.log(">>> Cat is running")
    }
    public birth(): void {
        console.log(">>> Cat is giving a birth");
    }
    public print(): void {
        console.log(`${this.getName()} is ${this.getAge()} years old`);
    }
    public makeSound(sound1: String): void {
        console.log(`Make 1 sound ${sound1}`);
    }
    public sex(): void {
        console.log("Cat has sex");
    }
}


/**
    1. Abstraction => simplify the logic, complexity hiding, what objects can do
    2. Encapsulation => data hiding, complexity hiding, access modifiers, grouping => new class
    3. Inheritance => is-a relationship
    4. Polymorphism
    => override
    => overload
    => compile (overload) - runtime binding (override)
*/

