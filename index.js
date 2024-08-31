function myNew(obj, ...args) {
    const newObj = {};
    newObj.__proto__ = obj.prototype;
    const res = obj.apply(newObj, args);
    return res instanceof Object ? res : newObj;
}


const resolvePromise = (promise,x,resolve,reject) => {
	if(x === promise) {
		reject(new TypeError('type error'));
        return;
	}
	if(x !== null && (typeof(x) === 'function' || typeof(x) === 'object')) {
		let called = false;
		try{
			let then = x.then;
			if(typeof(then) === 'function') {
				then.call(this,(res) => {
					if(called) return;
					called = true;
					resolvePromise((promise,res,resolve,reject));
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
		}catch(e){
			//TODO handle the exception
			if(called) return;
			called = true;
			reject(e);
		}
	}else {
		resolve(x);
	}
}
