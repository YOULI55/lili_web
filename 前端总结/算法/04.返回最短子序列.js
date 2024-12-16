// ['a, 'b', 'c']
// ['a','b']
// ['c','d']

// return ['b','c']
// 给一个二维数组，返回一个
// 包含每个子数组中最少一个元素的最短子序列
const check = (cur,i,arr) => {
    let newCur = [...cur];
    newCur.splice(i, 1);
    for(let j = 0;j < arr.length;j ++) {
        for(let k = 0;k < arr[j].length;k ++) {
            if(newCur.includes(arr[j][k])) {
                break;
            }
            if(k === arr[j].length - 1) {
                return false;
            }
        }
    }
    return true;
}
const fn = (arr) => {
    let cur = [];
    for(let val of arr) {
        cur.push(...val);
    }
    cur = [...new Set(cur)];
    for(let i = cur.length - 1;i >= 0;i --) {
        if(check(cur,i,arr)) {
            cur.splice(i, 1);
        }
    }
    return cur;
}

const arr = [['a','b','c'],['a','b'],['c','d'],['d']];
console.log(fn(arr)); // ['b','c']