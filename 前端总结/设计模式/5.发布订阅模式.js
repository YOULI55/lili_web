// 发布订阅模式
// 订阅者订阅相关主题，发布者通过发布主题事件的方式，通知订阅该主题的对象

class EventBus {
    constructor() {
      this.task = {};
    }
    on(type, fn) {
      // on 注册事件
      if (!this.task[type]) this.task[type] = [];
      this.task[type].push(fn);
    }
    emit(type, ...args) {
      // emit 发送事件
      if (this.task[type]) {
        this.task[type].forEach(fn => {
          fn.apply(this, args); // 注意this指向
        });
      }
    }
    off(type, fn) {
      // 删除事件
      if (this.task[type]) {
        this.task[type] = this.task[type].filter(item => item !== fn);
      }
    }
    once(type, fn) {
      // 只执行一次
      function f(...args) {
        fn(...args);
        this.off(type, f);
      }
      this.on(type, f);
    }
  }
  
  // 测试
  let events = new EventBus();
  events.on("change", (...args) => {
    console.log(args);
  });
  // 只执行一次
  events.once("change", (...args) => {
    console.log(args);
  });
  events.emit("change", 1, 2);
  events.emit("change", 2, 3);
  
  