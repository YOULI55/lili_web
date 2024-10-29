function createCounter() {
    let count = 0;
    return function() {
      count++;
      console.log(count);
    };
  }
   
  const counter = createCounter();
  counter(); // 1
  counter(); // 2
   
  // 清除闭包
  counter = null;
  // 此时，闭包中的 count 变量已经不再被任何外部引用，可以被垃圾收集器回收