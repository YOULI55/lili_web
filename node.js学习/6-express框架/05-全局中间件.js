// 记录所有请求的url和ip地址

const express = require('express')
const fs = require('fs')

const app = express()

// 声明全局中间件函数
const globalMiddleFunc = (req,res,next) => {
    const { url, ip } = req
    const date = new Date()
    fs.appendFileSync('./record.txt',`${url} --- ${ip} --- ${date}\r\n`)
    next()  // 使用next才会走下面的路由
}
app.use(globalMiddleFunc)

app.get('/home',(req,res) => {
    res.send('home page')
})

app.get('/index',(req,res) => {
    res.send('index page')
})

app.get('*',(req,res) => {
    res.send('<h1>404 Not Found</h1>')
})

app.listen(3000,() => {
    console.log('3000端口服务已启动！！！')
})