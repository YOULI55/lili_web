const quickSort = (arr) => {
	if(arr.length <= 1) return arr;
	let mid = Math.floor((arr.length - 1) / 2);
	let value = arr.splice(mid,1);
	let left = [],right = [];
	for(let item of arr) {
		if(item > value) {
			right.push(item);
		}else {
			left.push(item);
		}
	}
	return quickSort(left).concat(value,quickSort((right)));
}

const arr = [3,5,1,8,3,5,2,7,2];
console.log(quickSort(arr));