const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    // mode生产模式下tree-shaking会自动开启，打包后删除无用代码
    // mode: 'production', 
    mode: 'none', 
    optimization: {
        // tree-shaking开启，打包后删除无用代码
        usedExports: true,
        minimize: true,

        concatenateModules: true,  // 开启模块合并，将所有模块合并到一个函数中
    },
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: 'bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'output'),  // 指定输出文件目录
    },
    devServer: {
        hot: true,  // 开启热更新
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
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-widthsss'
            },
            template: './index.html'
        }),
        // 指定 HTML 模板文件路径在打包文件生成html文件
        new HtmlWebpackPlugin({
            filename: 'about.html',
            title: 'Webpack Plugin Title',
            meta: {
                viewport: 'width=device-widthsss'
            },
            template: './index.html'
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
        new HotModuleReplacementPlugin()  // 使用热更新插件
    ]
}