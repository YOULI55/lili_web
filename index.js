// const mySetInterval = (fn,delay) => { 
//     let timer = null;
// 	const interval = () => {
// 		fn();
// 		timer = setTimeout(() => {
// 			interval();
// 		},delay)
// 	}
//     interval();
// 	return () => {
// 		clearTimeout(timer);
// 	}
// }

// const clear1 = mySetInterval(() => {
// 	console.log(111)
// },1000)

// setTimeout(() => {
//     clear1();
// }, 5000);

// const clear2 = mySetInterval(() => {
// 	console.log(222)
// },1000)

// setTimeout(() => {
//     clear2();
// }, 10000);


const mySetTimeout = (fn, delay) => {
    let timer = null;
    const timeout = () => {
        timer = setInterval(() => {
            fn();
            clearInterval(timer);
        }, delay)
    }
    timeout();
}

mySetTimeout(() => {
    console.log('hello')
}, 1000)

mySetTimeout(() => {
    console.log('hello')
}, 2000)
console.log('end')