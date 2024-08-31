class Single {
    constructor(name) {
        this.name = name;
    }
    static getInstance(name) {
        // 静态方法
        if (!this.instance) {
            // 关键代码 this指向的是Single这个构造函数
            this.instance = new Single(name);
        }
        return this.instance;
    }
}

let single1 = Single.getInstance("name1");
let single2 = Single.getInstance("name2");
console.log(single1 === single2);  // true

// 一个类只能有一个实例，提供一个全局访问点