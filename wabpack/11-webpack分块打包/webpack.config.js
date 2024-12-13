const path = require('path'); // 引入 node.js path 模块处理绝对路径
const { VueLoaderPlugin } = require('vue-loader'); // 引入 vue-loader 插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin 插件
const webpack = require('webpack'); // 引入 webpack 模块

module.exports = {
    entry: './src/main.js',  // 指定入口文件路径
    // 指定输出文件路径
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development',  // 指定构建模式
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: 'all', // 分割的代码类型
            cacheGroups: {
                // 第三方模块
                vendors: {
                    name: 'vendors', // 名称
                    test: /[\\/]node_modules[\\/]/, // 匹配规则
                    priority: 10 // 优先级
                },
                // 公共模块
                common: {
                    name: 'common', // 名称
                    minSize: 1024, // 最小大小
                    minChunks: 2, // 最小引用次数
                    priority: 5 // 优先级
                }
            }
        }
    },
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