Promise.prototype.all = function(promises) {
	if (!Array.isArray(promises)) {
		throw new TypeError('type error');
	}
	return new myPromise((resolve, reject) => {
		let res = [];
		let count = 0;
		promises.forEach((promise, index) => {
			if (promise instanceof myPromise) {
				promise.then((result) => {
					count++;
					res[index] = result;
					if (count === promises.length) {
						resolve(res);
					}
				})
			} else {
				count++;
				res[index] = promise;
				if (count === promises.length) {
					resolve(res);
				}
			}
		})
	})
}