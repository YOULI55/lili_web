// 策略对象
const strategies = {
    // 验证是否为空
    isNoEmpty: function (value, errorMsg) {
        if (value.trim() === "") {
            return errorMsg;
        }
    },
    // 验证最小长度
    minLength: function (value, length, errorMsg) {
        if (value.trim().length < length) {
            return errorMsg;
        }
    },
    // 验证最大长度
    maxLength: function (value, length, errorMsg) {
        if (value.length > length) {
            return errorMsg;
        }
    }
};

// 根据策略对象不同的属性命中去验证
const data = [
    {
        name: 'isNoEmpty',
        value: '123',
    },
    {
        name: 'minLength',
        value: '123',
    }
]
for (let item of data) {
    strategies[item.name](item.value);
}