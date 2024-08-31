const http = require('http');
const fs = require('fs');

const server = http.createServer((request,response) => {
    const html = fs.readFileSync('./07-html响应文件.html').toString()

    // 注意，如果html里面引入了其他资源，需要在server里面动态判断url做处理

    console.log(html)
    response.end(html)
})

server.listen(9000,() => {
    console.log('9000端口已启动...')
})