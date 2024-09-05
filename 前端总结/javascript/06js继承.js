// 1.原型链继承
// 缺点：无法传参
function Parent(name) {
    this.name = name || 'father';
    this.arr = [1, 2, 3];
}
function Child(name) {
    this.sonName = name || 'child';
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

let boy = new Child('xiaoming');

// console.log(boy.arr);



// 2.构造函数继承
// 缺点：无法继承原型链上的属性和方法
function Parent1(name) {
    this.name = name || 'father';
    this.arr = [1, 2, 3];
    this.say = function() {
        console.log(this.name);
    }
}
function Child1(name) {
    Parent1.call(this, name);
    this.like = 'basketball';
}

let boy1 = new Child1('i am fa');
// console.log(boy1.name);



// 3.组合继承
// 缺点：父类构造函数执行了两次
function Parent2(name) {
    this.name = name || 'father';
    this.arr = [1, 2, 3];
}
Parent2.prototype.say = function() {
    console.log(this.name);
}

function Child2(name) {
    Parent2.call(this, name);  // 可以传参
    this.like = 'basketball';
}
Child2.prototype = new Parent2();  // 可以继承原型链上的属性和方法
Child2.prototype.constructor = Child2;



// 4.寄生组合继承
function Parent3(name) {
    this.name = name || 'father';
    this.arr = [1, 2, 3];
}
Parent2.prototype.say = function() {
    console.log(this.name);
}

function Child3(name) {
    Parent3.call(this,name);  // 可以传参
    this.like = 'basketball';
}
// 核⼼ 通过创建中间对象，⼦类原型和⽗类原型，就会隔离开，不会影响⽗类
Child3.prototype = Object.create(Parent3.prototype);
Child3.prototype.constructor = Child3;

let boy3 = new Child3('dadasdas');
console.log(boy3);