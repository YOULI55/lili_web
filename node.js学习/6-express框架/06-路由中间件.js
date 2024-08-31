// 针对 admin 和 setting 两个路由
// 要求url携带code=520参数，未携带提示暗号错误，终止交易

const express = require('express')

const app = express()

// 声明路由中间件函数
const routeMiddleFunc = (req,res,next) => {
    if(req.query.code === '520') {
        next()
    }else {
        res.send('暗号错误，终止交易！！！')
    }
}

app.get('/home',(req,res) => {
    res.send('home page')
})

app.get('/admin',routeMiddleFunc,(req,res) => {
    res.send('admin page')
})

app.get('/setting',routeMiddleFunc,(req,res) => {
    res.send('setting page')
})

app.get('*',(req,res) => {
    res.send('<h1>404 Not Found</h1>')
})

app.listen(3000,() => {
    console.log('3000端口服务已启动！！！')
})