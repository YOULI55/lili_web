const path = require('path'); // 引入 node.js path 模块处理绝对路径
const { VueLoaderPlugin } = require('vue-loader'); // 引入 vue-loader 插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin 插件
const webpack = require('webpack'); // 引入 webpack 模块

module.exports = {
    entry: './src/main.js',  // 指定入口文件路径
    // 指定输出文件路径
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }, 
    mode: 'development',  // 指定构建模式
    // 配置loaders,转换不同后缀的文件
    module: {
        rules: [
            {
                test: /.vue$/,  // 匹配 vue 文件
                use: 'vue-loader'
            },
            {
                test: /.css$/,  // 匹配 CSS 文件
                use: ['style-loader', 'css-loader', 'scss-loader'] // 从右到左解析
            },
            {
                test: /.m?js$/,  // 匹配 JS 文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,  // 匹配图片文件
                type: 'asset/resource', // 代替file-loader
            }
        ]
    },
    // 配置插件
    plugins: [
        new VueLoaderPlugin(), // vue-loader 插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            // 'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}