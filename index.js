const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(444)
    })
    resolve(111);
    console.log(222);
})
promise.then((res) => {
    console.log(res);
})

console.log(333);

setTimeout(() => {
    console.log(555);
    new Promise((resolve, reject) => {
        console.log(666);
        resolve(777);
    }).then((res) => {
        console.log(res);
    })
});

setTimeout(() => {
    console.log(888);
});

// 222 333 111 444 555 666 777 888