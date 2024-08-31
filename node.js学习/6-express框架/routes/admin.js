const express = require('express')
const router = express.Router()

router.get('/admin/index',(req,res) => {
    res.send('后台主页...')
})

router.get('/admin/setting',(req,res) => {
    res.send('设置页...')
})

module.exports = router