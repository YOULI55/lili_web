class myPromise {
    constructor(fn) {
        this.promiseStatus = 'pending';
        this.promiseResult = null;
        this.onFlufilledCallback = [];
        this.onRejectedCallback = [];
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e);
        }
    }

    resolve(result) {
        if (this.promiseStatus === 'pending') {
            this.promiseStatus = 'flufilled';
            this.promiseResult = result;
            this.onFlufilledCallback.forEach(callback => {
                callback();
            })
        }
    }

    reject(reason) {
        if (this.promiseStatus === 'pending') {
            this.promiseStatus = 'rejected';
            this.promiseResult = reason;
            this.onRejectedCallback.forEach(callback => {
                callback();
            })
        }
    }

    then(onFlufilled, onRejected) {
        onFlufilled = typeof onFlufilled === 'function' ? onFlufilled : res => res;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        }
        const promise = new myPromise((resolve, reject) => {
            if (this.promiseStatus === 'flufilled') {
                setTimeout(() => {
                    try {
                        let x = onFlufilled(this.promiseResult);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.promiseStatus === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.promiseResult);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.promiseStatus === 'pending') {
                this.onFlufilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFlufilled(this.promiseResult);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.promiseResult);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                })
            }
        })
        return promise;
    }

    static all(promises) {
        if (!Array.isArray(promises)) {
            throw new TypeError('type error');
        }
        return new myPromise((resolve, reject) => {
            let res = [];
            let count = 0;
            promises.forEach((promise, index) => {
                if (promise instanceof myPromise) {
                    promise.then((result) => {
                        count ++;
                        res[index] = result;
                        if(count === promises.length) {
                            resolve(res);
                        }
                    })
                } else {
                    count++;
                    res[index] = promise;
                    if(count === promises.length) {
                        resolve(res);
                    }
                }
            })
        })
    }
}

const resolvePromise = (promise, x, resolve, reject) => {
    if (x === promise) {
        reject(new TypeError('type error'));
        return;
    }
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (res) => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise, res, resolve, reject);
                }, (rea) => {
                    if (called) return;
                    called = true;
                    reject(rea);
                })
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (e) {
            //TODO handle the exception
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

const promise1 = 12;
const promise2 = 24;
const promise3 = new myPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

myPromise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});