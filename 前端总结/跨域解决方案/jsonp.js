// 创建一个script标签
let script = document.createElement('script');

// 设置script标签的src属性
script.type = 'text/javascript';

// 设置script标签的src属性，这里的地址是一个jsonp接口，
// 传一个函数名给后端，后端返回一个函数调用，这个函数调用就是我们传给后端的函数名
script.src = 'http://localhost:3000/jsonp?callback=callback';

// 将script标签添加到head中
document.head.appendChild(script);

// 定义一个函数，用于接收jsonp返回的数据
function callback(data) {
    console.log(data);
}