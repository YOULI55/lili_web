export function ref(value) {
    return createRef(value, false)
}

function createRef(rawValue, shallow = false) {
    if (isRef(rawValue)) {
        return rawValue
    }
    return new RefImpl(rawValue, shallow)
}

class RefImpl {
    _value
    _rawValue
    dep = new Dep()
    [ReactiveFlags.IS_REF] = true
    [ReactiveFlags.IS_SHALLOW] = false

    // 在构造函数中初始化当前变量的值
    constructor(value, isShallow = false) {
        this._rawValue = isShallow ? value : toRaw(value)
        this._value = isShallow ? value : toReactive(value)
        this[ReactiveFlags.IS_SHALLOW] = isShallow
    }

    // 在 get 中可以取到当前变量的值
    // 并且调用 dep 对象里面的 track 方法，track 方法会将当前变量订阅在 dep 中
    get value() {
        if (__DEV__) {
            this.dep.track({
                target: this,
                type: TrackOpTypes.GET,
                key: 'value',
            })
        } else {
            this.dep.track()
        }
        return this._value
    }

    // 在 set 中更新当前变量的值
    // 并且调用 dep 对象里面的 trigger 方法，trigger 方法会触发 dep 里面变量的更新
    set value(newValue) {
        // 先取到旧值
        const oldValue = this._rawValue
        // 判断新的值是不是引用类型
        const useDirectValue = this[ReactiveFlags.IS_SHALLOW] || isShallow(newValue) || isReadonly(newValue)
        // 如果是引用类型需要取到原始值
        newValue = useDirectValue ? newValue : toRaw(newValue)
        // 判断新值和旧值是否相等
        if (hasChanged(newValue, oldValue)) {
            this._rawValue = newValue
            this._value = useDirectValue ? newValue : toReactive(newValue)
            if (__DEV__) {
                this.dep.trigger({
                    target: this,
                    type: TriggerOpTypes.SET,
                    key: 'value',
                    newValue,
                    oldValue,
                })
            } else {
                this.dep.trigger()
            }
        }
    }
}
