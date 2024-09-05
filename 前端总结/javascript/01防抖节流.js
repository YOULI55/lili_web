// 防抖：只执行最后一次
const debounce = (fn,delay) => {
    let timer = null;
    return function() {
        if(timer) {
            clearTimeout(timer);
        };
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
};


// 节流：执行完才会执行下一次
const throttle = (fn,delay) => {
    let timer = null;
    return function() {
        if(!timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay);
        }
    }
}