Array.prototype.myReduce = function(callback,res) {
	let ans = this[0];
	let index = 1;
	if(res) {
		ans = res;
		index = 0;
	}
	for(let i = index;i < this.length;i ++) {
		ans = callback(ans,this[i]);
	}
	return ans;
}

const arr = [1,2,3,4,5,6];
console.log(arr.myReduce((a,b) => a + b));