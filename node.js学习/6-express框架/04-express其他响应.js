// 1.导入express
const express = require('express');
// console.log(express)

const app = express();

app.get('/request',(req,res) => {

    // 跳转响应s
    // res.redirect('https://www.baidu.com')

    // 下载响应
    // res.download(__dirname + '/package.json')

    // json响应
    res.json({name: 'll',age: 18})

    // 响应文件内容
    // res.sendFile(url)
    
    // res.send('hello!!!!express')
})

app.listen(3000,() => {
    console.log('3000端口服务已启动')
})