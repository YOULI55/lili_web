// 请求地址是login
// get请求显示表单网页
// post请求获取表单提交的信息

const express = require('express')
const bodyParser = require('body-parser')

// 解析json格式请求体的中间件
const jsonParser = bodyParser.json()
// 解析queryString格式请求体的中间件
const queryParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.get('/login',(req,res) => {
    // res.send('表单页面')
    // 响应文件内容
    res.sendFile(__dirname + '/09-from.html')
})

app.post('/login',queryParser,(req,res) => {
    console.log(req.body)
    res.send(`用户名：${req.body.username}\r\n密码：${req.body.password}`)
})

app.listen(3000,() => {
    console.log('服务已启动！！！')
})