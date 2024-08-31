// 1.buffer与字符串转换
const buf_1 = Buffer.from([121,232,111,254,132])
console.log(buf_1.toString())

// 2.使用[]获取值
const buf_2 = Buffer.from('hello')
console.log(buf_2[0])
buf_2[0] = 121
console.log(buf_2,buf_2[0])

// 3.溢出  buffer二进制所能存储的最大数值是255
const buf_3 = Buffer.from([361])   // 256 转换成二进制以后高于8位的数字会被舍弃
console.log(buf_3[0])