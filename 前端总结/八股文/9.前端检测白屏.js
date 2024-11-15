// 1.检测根节点是否渲染


// 2.检测页面和白屏对比


// 3.采样对比
// 监听页面白屏
function whiteScreen() {
    // 页面加载完毕
    function onload(callback) {
      if (document.readyState === 'complete') {
        callback();
      } else {
        window.addEventListener('load', callback);
      }
    }
    // 定义外层容器元素的集合
    let containerElements = ['html', 'body', '#app', '#root'];
    // 容器元素个数
    let emptyPoints = 0;
    // 选中dom的名称
    function getSelector(element) {
      if (element.id) {
        return "#" + element.id;
      } else if (element.className) {// div home => div.home
        return "." + element.className.split(' ').filter(item => !!item).join('.');
      } else {
        return element.nodeName.toLowerCase();
      }
    }
    // 是否为容器节点
    function isContainer(element) {
      let selector = getSelector(element);
      if (containerElements.indexOf(selector) != -1) {
        emptyPoints++;
      }
    }
    onload(() => {
      // 页面加载完毕初始化
      for (let i = 1; i <= 9; i++) {
        let xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        let yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
        isContainer(xElements[0]);
        // 中心点只计算一次
        if (i != 5) {
          isContainer(yElements[0]);
        }
      }
      // 17个点都是容器节点算作白屏
      if (emptyPoints == 17) {
        // 获取白屏信息
        console.log({
          status: 'error'
        });
      }
    });
}