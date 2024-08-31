// 需求：新建一个文件，命名‘座右铭.txt’，写入‘三人行，必有我师焉’

// 1.倒入fs模块
const fs = require('fs')

// 2.写入文件
// writeFile 是异步写入
fs.writeFile('./座右铭.txt','三人行，必有我师焉',(res) => {
    // 写入成功返回null，写入失败返回错误对象
    if(res) {
        console.log('写入失败error')
        return
    }
    console.log('写入成功success')
})

// writeFileSync 是同步写入
fs.writeFileSync('./座右铭同步.txt','test')