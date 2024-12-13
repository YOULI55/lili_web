// 1.导入express
const express = require('express');
// console.log(express)

const app = express();

app.get('/request',(req,res) => {
    
    // 原生操作
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    // express框架api
    console.log(req.path)
    console.log(req.query,'获取query参数')
    console.log(req.ip,'获取ip')
    console.log(req.get('host'),'获取请求头里面的host属性')

    res.end('hello express')
})

app.get('/:path',(req,res) => {
    // 动态获取路由参数
    console.log(req.params.path)
    res.end('hello path')
})
app.listen(3000,() => {
    console.log('3000端口服务已启动')
})