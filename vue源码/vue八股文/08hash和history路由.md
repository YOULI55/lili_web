1. hash路由有 #，history路由没有

2. hash路由通过hashChange监听路由变化，history通过pushState，replaceState和popState监听

3. history刷新页面可能会导致页面404，因为服务器会把路由当作请求地址，请求不到资源
需要服务器分别对前后端路由进行匹配