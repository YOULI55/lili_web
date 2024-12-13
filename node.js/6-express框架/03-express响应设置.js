// 1.导入express
const express = require('express');
// console.log(express)

const app = express();

app.get('/request',(req,res) => {
    
    // 原生设置
    // res.statusCode = '200'
    // res.statusMessage = 'success'
    // res.setHeader('xxx','yyy')
    // res.write('hello!!!')
    // res.end('hello express')

    // express响应
    res.status(500)
    res.set('zzz','nnn')
    res.send('hello!!!!express')
})

app.listen(3000,() => {
    console.log('3000端口服务已启动')
})