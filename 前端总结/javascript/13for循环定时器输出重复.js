// 会输出10个10，怎么样才能输出0-9呢？
// for(var i = 0;i < 10;i ++) {
//     setTimeout(() => {
//         console.log(i);
//     },1000)
// }

// 1. 通过let声明变量
for(let i = 0;i < 10;i ++) {
    setTimeout(() => {
        console.log(i);
    },1000);
}

// 2. 闭包
for(var i = 0;i < 10;i ++) {
    (function(i) {
        setTimeout(() => {
            console.log(i);
        },1000);
    })(i);
}

// 3. setTimeout第三个参数
for(var i = 0;i < 10;i ++) {
    setTimeout((i) => {
        console.log(i);
    },1000,i);
}
