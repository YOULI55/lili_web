const fs = require('fs')

// 1.异步读取
fs.readFile('./座右铭.txt',(res,data) => {
    if(res) {
        console.log('读取失败error')
        return
    }
    console.log('读取成功success')
    console.log(data.toString())
})

// 2.异步读取
const file = fs.readFileSync('./座右铭.txt')
console.log('异步读取成功',file.toString())