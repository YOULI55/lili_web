class myPromise {
    // 静态属性，promise的三个状态
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(func) {
        this.promiseStatus = myPromise.PENDING;  // 初始化状态为pending
        this.promiseResult = null;  // 初始化结果为null
        // 存储链式调用回调的数组
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        // try catch 遇到错误抛出异常
        try {   
            // func传入两个函数作为参赛，使用bind把函数this指向promise
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch(e) {
            this.reject(e);
        };
    };

    resolve(result) {
        // promise状态不可逆，所以为pending才会继续往下走
        if(this.promiseStatus === myPromise.PENDING) {
            this.promiseStatus = myPromise.FULFILLED;
            this.promiseResult = result;
            this.onFulfilledCallback.forEach(callback => {
                callback()
            })
        };
    };

    reject(reason) {
        if(this.promiseStatus === myPromise.PENDING) {
            this.promiseStatus = myPromise.REJECTED;
            this.promiseResult = reason;
            this.onRejectedCallback.forEach(callback => {
                callback()
            })
        };
    };

    then(onFulfilled, onRejected) {
        // 如果then里面的参赛不是函数，将其赋值为函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : res => res;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };

        let promise = new myPromise((resolve,reject) => {
            // 1.resolve抛出结果，状态变为FULFILLED
            if(this.promiseStatus === myPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.promiseResult);
                        resolvePromise(promise,x,resolve,reject);
                    } catch(e) {
                        reject(e);
                    };
                });
            };
            // 2.reject抛出结果，状态变为REJECTED
            if(this.promiseStatus === myPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.promiseResult);
                        resolvePromise(promise,x,resolve,reject);
                    } catch(e) {
                        reject(e);
                    };
                });
            };
            // 3.promise里面有异步操作，在then的时候先把执行函数存到callback数组
            if(this.promiseStatus === myPromise.PENDING) {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.promiseResult);
                            resolvePromise(promise,x,resolve,reject);
                        } catch(e) {
                            reject(e);
                        };
                    });
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.promiseResult);
                            resolvePromise(promise,x,resolve,reject);
                        } catch(e) {
                            reject(e);
                        };
                    });
                })
            };
        });
        return promise;
    };
};
// resolvePromise函数根据x的类型，对其进行处理
const resolvePromise = (promise,x,resolve,reject) => {
    if(x === promise) {   // 当执行返回的值等于当前promise，会抛出类型错误
        return reject(new TypeError('type error'));
    };
    // 最外层判断，如果x存在且为函数和对象，继续处理，否则resolve(x)
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called = false;  // 锁，确保只对x操作一次
        try {
            let then = x.then;
            // 如果x.then是函数，说明x是promise对象，如果是普通对象直接resolve(x)
            if(typeof then === 'function') {
                // 使用call改变this指向，并接收两个回调
                then.call(x,(res) => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise,res,resolve,reject);
                },(rea) => {
                    if(called) return;
                    called = true;
                    reject(rea);
                });
            }else {
                if(called) return;
                called = true;
                resolve(x);
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    }else {
        resolve(x);
    };
};

myPromise.defer = myPromise.deferred = function() {
    let dfd = {};
    dfd.promise = new myPromise((resolve,reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
};

module.exports =  myPromise;