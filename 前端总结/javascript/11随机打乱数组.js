const RandomArray = (arr) => {
    // arr.sort(() => Math.random() - 0.5);
    
	for(let i = 0;i < arr.length;i ++) {
		// 取从 0 ～ i 的随机数作为新索引
		let index = Math.round(Math.random() * (arr.length - 1));
		[arr[i],arr[index]] = [arr[index],arr[i]];
	}
    return arr;
};

const arr = [1,2,3,4,5,6,7,8,9,10];
console.log(RandomArray(arr));