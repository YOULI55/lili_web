const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none', 
    entry: {  // 多入口打包配置,配合下面的html-webpack-plugin插件使用
        index: './src/index.js',
        about: './src/about.js'
    },
    output: {
        filename: '[name].bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'dist'),  // 指定输出文件目录
    },
    optimization: {
        splitChunks: {
            chunks: 'all'  // 代码分割配置
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,  // 匹配 JS 文件
                use: {
                    // 使用 babel-loader将代编译后的码转换成es5
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /.css$/,  // 匹配 CSS 文件
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.png$/,  // 匹配 PNG 文件
                use: 'file-loader'
            },
            {
                test: /.png$/,  // 匹配 PNG 文件
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024  // 10 KB
                        // url-loader 配置只处理小于 10 KB 的文件，超过 10 KB 的文件会交给 file-loader 处理
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 使用清空打包文件插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']  // 指定引入的 JS 文件
        }),
        // 指定 HTML 模板文件路径在打包文件生成html文件
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/about.html',
            chunks: ['about']  // 指定引入的 JS 文件
        }),
        // 使用拷贝文件插件,拷贝 public 文件夹下的文件到打包文件夹
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: './'
                }
            ]
        }),
    ]
}