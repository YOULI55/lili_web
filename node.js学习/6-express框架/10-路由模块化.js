const express = require('express')

const app = express()

const homeRouter = require('./routes/home')
const adminRouter = require('./routes/admin')

app.use(homeRouter)
app.use(adminRouter)

app.listen(3000,() => {
    console.log('服务已启动...')
})


