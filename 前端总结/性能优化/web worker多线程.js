// js是单线程
// web worker是提供在主线程内部可以创建多个子线程

// web worker的特点
// 1. web worker 是运行在后台的js，独立于其他脚本，多线程提高了js的性能
// 2. web worker 可以大规模的处理数据  

// 3. web worker 不能访问dom，不能访问window对象，不能访问document对象
// 4. web worker 不能执行同步代码，只能执行异步代码

// 主线程
// 创建一个web worker
var worker = new Worker('./work.js');

//向worker发送消息
worker.postMessage('Hello Worker, I am main thread');

//监听worker发过来的消息
worker.onmessage = function(e) {
    console.log('Message received from worker');
}

//work.js 子线程
//监听主线程发送过来的消息
self.onmessage = function(e) {
    console.log('Received message:', e.data);
};

//向主线程发送消息
self.postMessage('Hello Main Thread, I am worker');

