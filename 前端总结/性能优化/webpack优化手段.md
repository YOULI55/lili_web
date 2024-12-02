1. thread-loader 多线程处理loader
    module.exports = {
    // ...
    module: {
        rules: [
        {
            test: /\.js$/,
            use: [
            'thread-loader',
            // 其他loader配置
            // thread-loader 会开启多个线程同时处理 babel-loader 的编译
            'babel-loader',
            ],
            exclude: /node_modules/,
        },
        // 其他规则...
        ],
    },
    // 其他配置...
    };

2.使用 compression-webpack-plugin 打包进行 GZIP 压缩
    const CompressionPlugin = require('compression-webpack-plugin');
    module.exports = {
    // ... 其他webpack配置
    plugins: [
        new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js(\?.*)?$/i, // 匹配需要压缩的文件
        threshold: 10240, // 只有大于此大小的文件会被压缩
        minRatio: 0.8, // 压缩比例，小于这个值的文件不会被压缩
        deleteOriginalAssets: false, // 是否删除原文件
        }),
    ],
    // ... 其他webpack配置
    };

3. 给 loader 配置 include exclude ，减少处理范围
    {
        test: /\.js$/,
        use: [
        'babel-loader',
        ],
        include:['/src/']
        exclude: /node_modules/,
    },

4. tree-shaking 过滤掉无用代码
    tree-shaking 原理
    {
        1.将源代码解析成抽象语法树
        2.遍历抽象语法树，标记每个节点的引用关系
        3.基于标记结果，移除没有引用的代码
    }
    需要注意的是,commonJS是动态引入，tree-shaking无法识别，只能识别ES6 Moudle 引入
    
5. 打包的文件命名配置 hash 值
    有context-hash,chunk-hash,hash三种  
    {
        hash是整个项目的hash值，不适用于缓存
        chunkHash是每个块的hash值，适用于分块打包的项目
        contextHash是每个文件的hash值，适用于精准控制缓存的项目
    }

6. 分块打包
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
	}
