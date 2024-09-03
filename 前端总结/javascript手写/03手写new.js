function myNew(func, ...args) {
    const obj = {};
    obj.__proto__ = func.prototype;
    const res = func.apply(obj, args);
    return res instanceof Object ? res : obj;
}

// 为什么根据执行结果的类型去返回值呢？

function Person(name, age) {
    console.log(this);
    this.name = name;
    this.age = age;
    // return 100;
    // 如果返回的是基本类型，那么会忽略返回值，返回 this 对象
}

const p = myNew(Person, "aym", 18);

console.log(p);