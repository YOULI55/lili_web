const mySort = (arr) => {
    for(let i = 0;i < arr.length;i ++) {
		for(let j = i + 1;j < arr.length;j ++) {
			if(arr[j] < arr[i]) {
				[arr[i],arr[j]] = [arr[j],arr[i]]
			}
		}
	}
	return arr;
}
const arr = [3,5,1,8,3,5,2,7,2];

console.log(mySort(arr));

