const arr = [1,33,[21,221,15,65,[99,3,[20]],20],10,29,123];

// 深度优先
const res = [];
const flatArr = (arr) => {
    for(let i = 0;i < arr.length;i ++) {
        if(arr[i] instanceof Array) {
            flatArr(arr[i]);
        }else {
            res.push(arr[i]);
        }
    }
}
flatArr(arr);
console.log(res);

// function flatArr(arr) { 
//     return arr.reduce((prev, cur) => { 
//         return prev.concat(Array.isArray(cur) ? flatArr(cur) : cur); 
//     }, []); 
// }

// 广度优先
// const queue = [arr];
// const res = [];
// while(queue.length) {
//     let len = queue.length;
//     for(let i = 0;i < len;i ++) {
//         let cur = queue.shift();
//         for(let j = 0;j < cur.length;j ++) {
//             if(cur[j] instanceof Array) {
//                 queue.push(cur[j]);
//             }else {
//                 res.push(cur[j]);
//             }
//         }
//     }
// }
// console.log(res);