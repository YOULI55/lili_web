// 三种创建方式
// 1.alloc
const buf = Buffer.alloc(10);
console.log(buf);

// 2.allocUnsafe
const buf_2 = Buffer.allocUnsafe(10);
console.log(buf_2);

// 3.from
const buf_3 = Buffer.from('hello')
console.log(buf_3);
const buf_4 = Buffer.from([1,2,3,4,5])
console.log(buf_4)