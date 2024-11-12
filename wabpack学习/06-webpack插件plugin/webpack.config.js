const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 自定义一个清楚 bundle 文件中注释的插件
class MyPlugin {
    apply(compiler) {
        // 注册一个插件,在emit钩子中获取打包文件的内容
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                console.log(name);  // 输出打包文件的名称
                // console.log(compilation.assets[name].source());  // 输出打包文件的内容
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source();
                    const withoutComments = contents.replace(/\/\*\*+\*\//g, '');
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }·
            }
        })
    }
}

// 在Webpack中，以下是compiler.hooks中一些常用钩子的触发顺序：

    //   1.   environment: 在开始读取配置之前触发。
    //   2.   afterEnvironment: 在读取配置之后触发。
    //   3.   entryOption: 在处理入口配置之前触发。
    //   4.   afterPlugins: 在加载完插件之后触发。
    //   5.   afterResolvers: 在解析完所有插件之后触发。
    //   6.   beforeRun: 在开始运行Webpack之前触发。
    //   7.   run: 在Webpack开始运行时触发。
    //   8.   watchRun: 在开始运行Webpack并处于监听模式时触发。
    //   9.   normalModuleFactory: 在正常模块工厂创建之后触发。
    //   10.  contextModuleFactory: 在上下文模块工厂创建之后触发。
    //   11.  beforeCompile: 在编译之前触发。
    //   12.  compile: 在开始编译时触发。
    //   13.  thisCompilation: 在开始新的编译时触发。
    //   14.  compilation: 在编译创建之后触发。
    //   15.  make: 在创建编译完成后触发。
    //   16.  afterCompile: 在编译之后触发。
    //   17.  emit: 在生成资源到输出目录之前触发。
    //   18.  afterEmit: 在生成资源到输出目录之后触发。
    //   19.  done: 在Webpack完成构建之后触发。

module.exports = {
    mode: 'none',
    entry: './src/main.js',  // 指定入口文件路径
    output: {
        filename: 'bundle.js',  // 指定输出文件路径
        path: path.join(__dirname, 'output'),  // 指定输出文件目录
        // publicPath: 'output'  // 指定输出文件的公共路径
    },
    module: {
        rules: [
            // {
            //     test: /.html$/,  // 匹配 HTML 文件
            //     loader: 'html-loader',
            //     options: {
            //         attributes: {
            //             list: [  // 指定处理的标签和属性
            //                 {
            //                     tag: 'img',
            //                     attribute: 'src',
            //                     type: 'src'
            //                 },
            //                 {
            //                     tag: 'a',
            //                     attribute: 'href',
            //                     type: 'src'
            //                 }
            //             ]
            //         }
            //     }
            // },
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
        // 自定义插件
        new MyPlugin()
    ]
}