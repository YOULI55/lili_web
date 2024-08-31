// 1.导入express
const express = require('express');
// console.log(express)

// 2.创建应用对象
const app = express();

// 3.创建路由
// 路由包含了 请求方法 请求路径 和回调函数
app.get('/home',(request,response) => {
    response.end('hello express')
})

app.get('/',(request,response) => {
    response.end('home page')
})

app.post('/login',(request,response) => {
    response.end('login page')
})

// all表示请求方法不做限制
app.all('/all',(request,response) => {
    response.end('all page')
})

// 404响应
app.all('*',(req,res) => {
    res.end('404 Not Found')
})

// 4.监听端口，启动路由
app.listen(3000,() => {
    console.log('3000端口服务已启动')
})