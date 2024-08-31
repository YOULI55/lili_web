const ejs = require('ejs')
const fs = require('fs')


let country = 'China'
let weather = '今天天气不错！！！'
let str = fs.readFileSync('./01-test.html').toString()

let result = ejs.render(str,{ country, weather })
console.log(result)