// 1.导入http模块
const http = require('http');

// 2.创建服务对象
const server = http.createServer((request,response) => {
    // 1.设置响应状态码
    response.statusCode = 203;

    // 2.设置响应状态描述
    response.statusMessage = 'success request'

    // 3.设置响应头
    response.setHeader('content-type','text/html;charset=utf-8')

    // 4.write可以多次设置响应体
    response.write('ll')
    response.write('ll')
    response.write('ll')

    response.end('response')  // 设置响应体
})

// 3.监听端口，启动服务
server.listen(9000,() => {
    console.log('服务已启动...')
})