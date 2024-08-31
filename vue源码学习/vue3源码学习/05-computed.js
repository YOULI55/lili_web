// 定义一个名为computed的函数，该函数接受一个参数getterOrOptions，这个参数可以是计算属性的getter函数，也可以是包含get和set方法的对象
export function computed(getterOrOptions) {
    // 定义两个变量getter和setter，分别用于存储计算属性的getter函数和setter函数
    let getter
    let setter

    // 判断getterOrOptions是否为函数类型，如果是，说明只传入了getter函数
    const onlyGetter = isFunction(getterOrOptions)
    if (onlyGetter) {
        // 如果只传入了getter函数，将getterOrOptions赋值给getter，同时定义setter函数
        getter = getterOrOptions
        setter = __DEV__
            ? () => {
                warn(
                    `Write operation failed: computed value is readonly`
                )
            }
            : NOOP
    } else {
        // 如果传入了包含get和set方法的对象，将get方法赋值给getter，将set方法赋值给setter
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }

    // 创建一个新的ComputedRefImpl实例，并返回。这个实例接收getter、setter和一个布尔值参数
    return new ComputedRefImpl(
        getter,
        setter,
        isFunction(getterOrOptions) || !getterOrOptions.set
    )
}

class ComputedRefImpl {
    // 定义一个私有变量 _dirty，表示是否需要重新计算值。初始化为 true 表示需要重新计算
    _dirty = true

    // 定义两个公共的只读属性，用于标识这个引用是否只读和是否是响应式的引用
    __v_isReadonly
    __v_isRef = true

    constructor(getter, _setter, isReadonly) {
        // 创建一个 reactive effect，当值发生变化时触发。如果值没有变化则不触发。 
        this.effect = ReactiveEffect(getter, {
            lazy: true, // 懒加载，只有当需要时才执行
            scheduler: () => { // 调度器函数
                if (!this._dirty) {
                    this._dirty = true // 重置 _dirty 为 true，表示需要重新计算
                }
            }
        })
    }

    // 定义一个 getter 方法，返回当前的值。
    get value() {
        
        // 计算属性的缓存机制体现

        if (this._dirty) { // 如果 _dirty 为 true，表示需要被重新计算
            this._value = this.effect() // 调用 effect 方法来计算值
            this._dirty = false // 设置 _dirty 为 false，表示值已经被计算过
        }
        return this._value
    }

    // 定义一个 setter 方法，设置新的值并调用传入的 setter 方法来处理这个新值
    set value(newValue) {
        this._setter(newValue)
    }
}

