const fs = require('fs')

// 异步追加写入
fs.appendFile('./座右铭.txt','\r\n我追加了：择其善者而从之', res => {
    // 参数和写入一样
    if(res) {
        console.log('写入失败error')
        return
    }
    console.log('写入成功sucess')
})

// 同步追加写入
fs.appendFileSync('./座右铭同步.txt','\r\n追加了new test')

// writeFile配置参数追加写入
fs.writeFile('./座右铭.txt','\r\n我是writeFile追加写入',{ flag: 'a' },res => {

})