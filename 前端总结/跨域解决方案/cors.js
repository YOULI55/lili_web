// 允许 http://example.com 发起跨域请求，*代表所有域名都可以
// 响应头配置Access-Control-Allow-Origin: http://example.com || *

// 配置跨域的响应头
// Access-Control-Allow-Methods: POST, GET, OPTIONS

// 自定义跨域的响应头
// Access-Control-Allow-Headers: X-Custom-Header, Content-Type

// cors分成简单请求和复杂请求
{
    // 简单请求：get、post、head
    // 简单请求的特点：
    {
        // Content-Type：只能是application/x-www-form-urlencoded、multipart/form-data、text/plain
        // 不能自定义请求头
        // 不能发送cookie
    }
    // 复杂请求：put、delete、options、patch
    // 复杂请求的特点：
    {
        // 可以自定义请求头
        // 在请求前会先发送一个options请求，询问服务器是否允许请求，返回成功才会进行请求
    }
}

// 跨域是浏览器同源策略导致的
// 所以服务端向服务端发送请求并不会导致跨域问题