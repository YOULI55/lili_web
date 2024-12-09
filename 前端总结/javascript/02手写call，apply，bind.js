// 1.实现call
Function.prototype.myCall = function(context,...args) {
    context = context || window;
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[fn];
    return result;
}

// 2.实现bind
Function.prototype.myApply = function(context,args) {
    context = context || window;
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[fn];
    return result;
}

// 3.实现bind
Function.prototype.myBind = function(context,...args) {
    context = context || window;
    const fn = this;
    const res = function(...newArgs) {
        return fn.apply(context,[...args,...newArgs]);
    }
    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    res.prototype = Object.create(fn.prototype);
    return res;
}

// const obj = {
//     name: 'aym',
//     age: 18,
// }

// const obj2 = {
//     name: 'jack',
//     age: 20,
//     fn: function(a,b,c) {
//         console.log(this.name,this.age,a,b,c);
//     }
// }

// this.name = 'window';
// this.age = 100;


// obj2.fn.myBind(obj,1,2)(3);