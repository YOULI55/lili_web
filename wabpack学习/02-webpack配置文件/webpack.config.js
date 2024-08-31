const path = require('path');

module.exports = {
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: 'bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'output')  // 指定输出文件目录
    }
}