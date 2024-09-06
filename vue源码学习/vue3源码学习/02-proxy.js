// 使用Proxy包装响应式对象
const reactiveProxy = new Proxy(state, {
    get(target, property) {
        track(target, property); // 你可以实现一个track函数来跟踪依赖
        return target[property];
    },
    set(target, property, value) {
        target[property] = value;
        trigger(target, property); // 你可以实现一个trigger函数来触发更新
        return true;
    }
});