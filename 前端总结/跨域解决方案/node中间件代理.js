// webpack-dev-server  // 本地开发服务器利用node中间件代理请求


// devServer: {
//     static : './public',  // 指定静态文件目录
//     proxy: [
//         {   
//             context: ['/api'],  // 指定代理的请求路径
//             target: 'https://api.github.com',
//             pathRewrite: {
//                 '^/api': ''
//             },
//             changeOrigin: true
//         },
//     ]
// },