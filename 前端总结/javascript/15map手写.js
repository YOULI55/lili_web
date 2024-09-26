Array.prototype.myMap = function(callback) {
    const res = [];
	for(let i = 0;i < this.length;i ++) {
		res.push(callback(this[i],i,this));
	}
	return res;
}

const arr = [1,2,3,4,5,6];
console.log(arr.myMap((a) => a * 2)); // [2,4,6,8,10,12]