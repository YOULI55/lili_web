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