// 1.导入http模块
const http = require('http');
// 导入url模块
const url = require('url');

// 2.创建服务对象
const server = http.createServer((request,response) => {
    response.end('url')  // 设置响应体
    
    // 第一种方式
    const serverUrl = request.url;
    console.log(serverUrl)
    let resUrl = url.parse(serverUrl)  // 解析url并获取URL对象
    console.log(resUrl)
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?nsan=ssad&aa=bb',
    //     query: 'nsan=ssad&aa=bb',
    //     pathname: '/serachsada',             // 路径
    //     path: '/serachsada?nsan=ssad&aa=bb',
    //     href: '/serachsada?nsan=ssad&aa=bb'
    //   }


    // 第二种方式
    let newUrl = new URL(request.url,'http://localhost:9000')
    console.log('---------\r\n',newUrl)
})

// 3.监听端口，启动服务
server.listen(9000,() => {
    console.log('服务已启动...')
})