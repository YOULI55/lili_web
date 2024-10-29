class myPromise {
	static PENDING = 'pending';
	static FULFLIIED = 'fulfilled';
	static REJECTED = 'rejected';
	constructor (func) {
		this.status = myPromise.PENDING;
		this.result = null;
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];
		try {
			func(this.resolve.bind(this),this.reject.bind(this));
		}catch(e) {
			this.reject(e);
		}
	}
	
	resolve(res) {
		if(this.status === myPromise.PENDING) {
			this.status = myPromise.FULFLIIED;
			this.result = res;
			this.onFulfilledCallback.forEach(callback => {
				callback();
			})
		}
	}
	
	reject(rea) {
		if(this.status === myPromise.PENDING) {
			this.status = myPromise.REJECTED;
			this.result = rea;
			this.onRejectedCallback.forEach(callback => {
				callback();
			})
		}
	}
	
	then(onFulfilled,onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : res => res;
		onRejected = typeof onRejected === 'function' ? onRejected : (rea) => {
			throw rea;
		}
		const promise = new myPromise((resolve,reject) => {
			if(this.status === myPromise.PENDING) {
				this.onFulfilledCallback.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.result);
							resolvePromise(promise,x,resolve,reject);
						}catch (e) {
							reject(e);
						}
					})
				})
				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.result);
							resolvePromise(promise,x,resolve,reject);
						}catch (e) {
							reject(e);
						}
					})
				})
			}
			if(this.status === myPromise.FULFLIIED) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.result);
						resolvePromise(promise,x,resolve,reject);
					}catch (e) {
						reject(e);
					}
				})
			}
			if(this.status === myPromise.REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.result);
						resolvePromise(promise,x,resolve,reject);
					}catch (e) {
						reject(e);
					}
				})
			}
		}) 
		return promise;
	}
}

const resolvePromise = (promise,x,resolve,reject) => {
	if(x === promise) {
		reject(new TypeError('type error'));
		return;
	}
	if(x !== null && (typeof x === 'function' || typeof x == 'object')) {
		let called = false;
		try{
			let then = x.then;
			if(typeof then === 'function') {
				then.call(x,(res) => {
					if(called) return;
					called = true;
					resolvePromise(promise,res,resolve,reject);
				},(rea) => {
					if(called) return;
					called = true;
					reject(rea);
				})
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
	}
}

myPromise.defer = myPromise.deferred = function() {
    let dfd = {};
    dfd.promise = new myPromise((resolve,reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
};

module.exports =  myPromise;