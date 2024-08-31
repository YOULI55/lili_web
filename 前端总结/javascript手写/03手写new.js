function myNew(func, ...args) {
    const obj = {};
    obj.__proto__ = func.prototype;
    const res = func.apply(obj, args);
    return res instanceof Object ? res : obj;
}

function Person(name, age) {
    console.log(this);
    this.name = name;
    this.age = age;
}

const p = myNew(Person, "aym", 18);

console.log(p);