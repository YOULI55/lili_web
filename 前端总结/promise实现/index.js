class myPromise {
	static PENDING = 'pending';
	static REFULFILLED = 'refulfilled';
	static REINJECTED = 'rejected';
	constructor(func) {
		this.promiseStatus = myPromise.PENDING;
		this.promiseResult = null;
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];
		try {
			func(this.resolve.bind(this),this.reject.bind(this));
		} catch(e) {
			this.reject(e);
		}
	};
	
	resolve(result) {
		if(this.promiseStatus === myPromise.PENDING) {
			this.promiseStatus = myPromise.REFULFILLED;
			this.promiseResult = result;
			this.onFulfilledCallback.forEach(callback => {
				callback();
			})
		}
	};
	
	reject(reason) {
		if(this.promiseStatus === myPromise.PENDING) {
			this.promiseStatus = myPromise.REINJECTED;
			this.promiseResult = reason;
			this.onRejectedCallback.forEach(callback => {
				callback();
			})
		}
	};
	
	then(onFulfilled,onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (res) => res;
		onRejected = typeof onRejected === 'function' ? onRejected : (rea) => {
			throw rea;
		}
		const promise = new myPromise((resolve,reject) => {
			if(this.promiseStatus === myPromise.PENDING) {
				this.onFulfilledCallback.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.promiseResult);
							promiseResolve(promise,x,resolve,reject);
						} catch(e) {
							reject(e);
						}
					});
				});
                
				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.promiseResult);
							promiseResolve(promise,x,resolve,reject);
						} catch(e) {
							reject(e);
						}
					});
				})
			};
            if(this.promiseStatus === myPromise.REFULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.promiseResult);
                        promiseResolve(promise,x,resolve,reject);
                    } catch(e) {
                        reject(e);
                    };
                });
            };
			if(this.promiseStatus === myPromise.REINJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.promiseResult);
						promiseResolve(promise,x,resolve,reject);
					} catch(e) {
						reject(e);
					}
				});
			}
		})
		return promise;
	}
}

const promiseResolve = (promise,x,resolve,reject) => {
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
                    promiseResolve(promise,res,resolve,reject);
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
