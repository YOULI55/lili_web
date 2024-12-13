// 1.导入http模块
const http = require('http');

// 2.创建服务对象
const server = http.createServer((request,response) => {
    // response.end('hello http server!!!哈哈')  // 设置响应体

    // 提取请求体报文
    // console.log(request.method,'获取请求的方法')
    // console.log(request.url,'获取请求的url')  // 只包含请求的路径和拼接的参数，不包含协议，域名和端口号
    // console.log(request.httpVersion,'获取协议的版本号')
    // console.log(request.headers)  // 获取请求头

    // 提取响应体信息
    let body = ''
    // 绑定data事件获取相应体
    response.on('data',(res) => {
        body += res
    })
    // 响应介绍以后打印响应体
    response.on('end',() => {
        console.log(body)
        response.end('hello http server')
    })
})

// 3.监听端口，启动服务
server.listen(9000,() => {
    console.log('服务已启动...')
})