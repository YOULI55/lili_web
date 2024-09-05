1. thread-loader 多线程打包
    module.exports = {
    // ...
    module: {
        rules: [
        {
            test: /\.js$/,
            use: [
            'thread-loader',
            // 其他loader配置，比如babel-loader
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
    
5. 打包的文件命名配置 hash 值