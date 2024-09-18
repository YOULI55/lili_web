const mergeSort = (arr) => {
    if(arr.length <= 1) {
		return arr;
	}
	const mid = Math.floor(arr.length / 2);
	const left = arr.slice(0,mid);
	const right = arr.slice(mid);
	return merge(mergeSort(left),mergeSort(right));
}

const merge = (left,right) => {
    const res = [];
    while(left.length && right.length) {
        if(left[0] < right[0]) {
            res.push(left[0]);
            left.shift();
        }else {
            res.push(right[0]);
            right.shift();
        }
    }
    return res.concat(left,right);
 }
console.log(mergeSort([3,4,1,5,2,7,9,3]))