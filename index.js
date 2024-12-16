

a:[ture,ture,false]
b:[ture,ture,false]
c:[ture,false,ture]

const check = (val,cur,arr) => {
    let newCur = [...cur];
    let index = newCur.indexOf(val);
    let temp = newCur[index];
    if(index !== -1) {
        newCur.splice(index, 1);
    }else {
        return false;
    }
    for(let i = 0;i < arr.length;i ++) {
        // for(let j = 0;j < newCur.length;j ++) {
        //     if(!arr[i].includes(newCur[j])) {
        //         return false;
        //     }
        // }
    }
    return true;
}

const fn = (arr) => {
    let cur = [];
    for(let a of arr) {
        cur.push(...a);
    }
    cur = [...new Set(cur)];
    for(let i = 0;i < arr.length;i ++) {
        for(let j = 0;j < arr[i].length;j ++) {
            if(check(arr[i][j],cur,arr)) {
                let index = cur.indexOf(arr[i][j]);
                if(index !== -1) {
                    cur.splice(index, 1);
                }
            }
        }
    }
    return cur;
}