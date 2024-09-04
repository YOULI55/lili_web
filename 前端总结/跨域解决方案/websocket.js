
const socket = new WebSocket("ws://localhost:8080");
// 添加消息监听功能
// socket.addEventListener('message', function (msg) {
//     console.log('受到服务器发送的消息:' + msg);
// })
socket.onopen = function () {
    console.log('链接成功');
}
socket.onerror = function (event, e) {
    console.log('链接失败' + event.data);
}
socket.onmessage = function (msg) {
    console.log('接收到消息' + msg.data);
}
socket.onclose = function () {
    console.log('链接关闭');
}

submitBtn.addEventListener('click', function () {
    const msg = txt.value
    console.log('文本内容', msg);
    socket.send(msg)
    txt.value = ''
})
console.log('打印默认属性',
    '\n连接所传输二进制数据的类型:', socket.binaryType,
    '\n已经被send()方法放入队列中但还没有被发送到网络中的数据的字节数', socket.bufferedAmount,
    '\n服务器已选择的扩展值', socket.extensions,
    '\n服务器端选中的子协议的名字', socket.protocol,
    '\n链接状态', socket.readyState,
    '\n构造函数创建WebSocket实例对象时URL的绝对路径', socket.url);