const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: '[name].[hash].bundle.js',  // 指定文件名为 打包后的文件名 + hash值 +bundle.js
        path: path.join(__dirname, 'output'),  // 指定输出文件目录
        publicPath: 'output'  // 指定输出文件的公共路径
    },
    module: {
        rules: [
            {
                test: /.md$/,  // 匹配 MD 文件
                use: './markdown-loader'    // 使用自定义 loader
            },
            {
                test: /.html$/,  // 匹配 HTML 文件
                loader: 'html-loader',
                options: {
                    attributes: {
                        list: [  // 指定处理的标签和属性
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'a',
                                attribute: 'href',
                                type: 'src'
                            }
                        ]
                    }
                }
            },
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
            // {
            //     test: /.png$/,  // 匹配 PNG 文件
            //     use: 'file-loader'
            // },
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
    }
}