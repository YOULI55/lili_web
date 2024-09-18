// 发送方页面（同源页面）
window.addEventListener('load', function() {
    var popup = window.open('http://other-domain.com/popup.html', 'title');
    popup.postMessage('Hello, World!', 'http://other-domain.com');
});
 
// 接收方页面（popup.html）
window.addEventListener('message', function(event) {
    if (event.origin !== "http://your-domain.com") return; // 检查消息来源
    console.log(event.data); // 输出: Hello, World!
});

// 解决的是两个不同源的页面之间的通信问题，通过postMessage方法可以实现跨域通信，
// 但是需要两个页面都要支持postMessage方法，而且接收方需要知道消息来源，
// 所以需要在接收方页面中判断消息来源，防止恶意代码的注入。