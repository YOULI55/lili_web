const path = require('path');

module.exports = {
    mode: 'none',  // 指定构建模式
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: 'bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'output')  // 指定输出文件目录
    }
}