// 通过cancelToken取消请求
const request = axios.CancelToken.source() // 返回一个包含 cancel 方法的对象
axios.get('/user/12345', {
  cancelToken: cancel.token
}).catch(function (thrown) {
    // 在这里处理请求被取消的情况 
    request.cancel('Request canceled') // 取消请求
})
