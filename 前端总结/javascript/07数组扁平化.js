const arr = [1,33,[21,221,15,65,[99,3,[20]],20],10,29,123];

const flatArr = (arr,res = []) => {
    for(let i = 0;i < arr.length;i ++) {
        if(arr[i] instanceof Array) {
            flatArr(arr[i],res);
        }else {
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(flatArr(arr));
newArr = flatArr(arr);
newArr.sort((a,b) => Math.random() > 0.5 ? 1 : -1); 
console.log(newArr);