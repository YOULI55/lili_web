// 创建一个map，用于存储已经被代理的对象
export const reactiveMap = new WeakMap()

export function reactive(target) {
    //  如果目标对象是只读的，直接返回
    if (isReadonly(target)) {
        return target
    }
    // 创建一个响应式对象
    return createReactiveObject(
        target,
        false,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap,
    )
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    // 如果目标对象不是对象，直接返回
    if (!isObject(target)) {
        if (__DEV__) {
            warn(
                `value cannot be made ${isReadonly ? 'readonly' : 'reactive'}: ${String(
                    target,
                )}`,
            )
        }
        return target
    }
    //如果目标对象已经被代理过，直接返回
    if (
        target[ReactiveFlags.RAW] &&
        !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
    ) {
        return target
    }
    // 如果目标对象已经被代理过，直接返回
    const existingProxy = proxyMap.get(target)
    if (existingProxy) {
        return existingProxy
    }
    // only specific value types can be observed.
    const targetType = getTargetType(target)
    if (targetType === TargetType.INVALID) {
        return target
    }
    // 创建一个代理对象
    const proxy = new Proxy(
        target,
        targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
    )
    // 将代理对象存储到map中
    proxyMap.set(target, proxy)
    return proxy
}