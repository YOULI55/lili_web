const http = require('http')

const server = http.createServer((request,resopnse) => {
    let url = new URL(request.url,'http://localhost:9000')
    let method = request.method;
    
    if(method === 'GET' && url.pathname === '/login') {
        resopnse.end('login page')
    }else if(method === 'GET' && url.pathname === '/re') {
        resopnse.end('re page')
    }else {
        resopnse.end('404 not found')
    }
})

server.listen(9000,() => {
    console.log('9000端口服务器已启动...')
})