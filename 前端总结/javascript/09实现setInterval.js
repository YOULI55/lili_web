// const mySetInterval = (fn,delay) => {
// 	let timer = null;
// 	const inerval = () => {
// 		fn();
// 		timer = setTimeout(inerval,delay);
// 	}
// 	inerval();
// 	return () => {
// 		clearTimeout(timer);
// 	}
// }

// const clear = mySetInterval(() => {
// 	console.log('start');
// },1000)


// setTimeout(() => {
// 	clear();
// },5000)