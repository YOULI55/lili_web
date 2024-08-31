
const express = require('express')

const app = express()

// 静态资源中间件设置 引入之后可以直接通过ip加url获取资源
app.use(express.static(__dirname + '/public'))

app.get('/home',(req,res) => {
    res.send('home page')
})


app.listen(3000,() => {
    console.log('3000端口服务已启动！！！')
})