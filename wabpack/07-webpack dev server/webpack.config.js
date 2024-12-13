const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: 'bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'output'),  // 指定输出文件目录
        // publicPath: 'output'  // 指定输出文件的公共路径
    },
    // devtool: 'source-map',  // 使用 source-map 方便调试
    devtool: 'eval-cheap-module-source-map',  // 开发环境常用的soucer-map
    devServer: {
        static : './public',  // 指定静态文件目录
        proxy: [
            {   
                context: ['/api'],  // 指定代理的请求路径
                target: 'https://api.github.com',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            },
            // '/api': {
            //     // 代理到的目标地址
            //     // htttp://localhost:8080/api/users => https://api.github.com/users
            //     target: 'https://api.github.com',
            //     pathRewrite: {
            //         '^/api': ''
            //     },
            //     // 不使用本地的代理服务器
            //     changeOrigin: true
            // }
        ]
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
    ]
}