const express = require('express')

// 创建路由对象
const router = express.Router()

// 创建路由
router.get('/home/index',(req,res) => {
    res.send('主页...')
})

router.get('/home/search',(req,res) => {
    res.send('搜索页...')
})

// 暴露路由
module.exports = router