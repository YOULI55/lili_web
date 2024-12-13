const fs = require('fs');
const path = require('path');


// resolve绝对路径拼接
const newPath = path.resolve(__dirname,'path.js')

console.log(__dirname,newPath)

// __filename获取文件绝对路径
console.log(__filename)