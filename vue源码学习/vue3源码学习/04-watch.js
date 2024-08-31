
export function watch(source, cb, options) {
    return doWatch(source, cb, options)
}

// source 可以是一个 ref 类型的数据，
// 或者是一个具有返回值的 getter 函数，
// 也可以是一个响应式的 obj 对象。
// 当侦听的是多个源时，source 可以是一个数组
function doWatch(source, cb, options) {
    const {
        immediate,
        deep,
        flush,
        once,
        onTrack,
        onTrigger,
    } = options
    if (cb && once) {
        const _cb = cb
        cb = (...args) => {
            _cb(...args)
            watchHandle()
        }
    }

    const instance = currentInstance

    // 创建一个 getter 函数，用于获取 source 的值
    let getter
    // 是否深度监听
    let forceTrigger = false
    let isMultiSource = false
    
    // 如果 source是 ref对象，则创建一个访问 source.value的 getter函数；
    if (isRef(source)) {
        getter = () => source.value
        forceTrigger = isShallow(source)
    // 如果 source 是一个响应式对象，则创建一个访问 source 的 getter 函数
    } else if (isReactive(source)) {
        getter = () => reactiveGetter(source)
        forceTrigger = true
    // 如果 source 是一个数组，则创建一个访问 source 的 getter 函数
    } else if (isArray(source)) {
        isMultiSource = true
        forceTrigger = source.some(s => isReactive(s) || isShallow(s))
        getter = () =>
            source.map(s => {
                if (isRef(s)) {
                    return s.value
                } else if (isReactive(s)) {
                    return reactiveGetter(s)
                } else if (isFunction(s)) {
                    return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
                } else {
                    __DEV__ && warnInvalidSource(s)
                }
            })
    // 如果 source 是一个函数，则创建一个访问 source 的 getter 函数
    } else if (isFunction(source)) {
        if (cb) {
            // getter with cb
            getter = () =>
                callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
        } else {
            // no cb -> simple effect
            getter = () => {
                if (cleanup) {
                    cleanup()
                }
                return callWithAsyncErrorHandling(
                    source,
                    instance,
                    ErrorCodes.WATCH_CALLBACK,
                    [onCleanup],
                )
            }
        }
    // 不是期待的 source 类型
    } else {
        getter = NOOP
        __DEV__ && warnInvalidSource(source)
    }

    // 旧值初始化
    let oldValue = isMultiSource ? new Array((source).length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE

    // 创建一个 job 函数，维护新旧值，执行回调函数
    const job = (immediateFirstRun) => {
        if (!(effect.flags & EffectFlags.ACTIVE) ||(!effect.dirty && !immediateFirstRun)) {
            return
        }
        // 判断回调函数 cb是否传入，如果有传入，那么是 watch的调用场景，否则是 watchEffect函数被调用的场景
        if (cb) {
            // watch(source, cb)
            // 首先执行副作用函数获取最新的值 newValue，然后判断是否需要执行回调函数 cb的情况
            const newValue = effect.run()
            if (
                deep ||
                forceTrigger ||
                (isMultiSource
                    ? (newValue).some((v, i) => hasChanged(v, oldValue[i]))
                    : hasChanged(newValue, oldValue)) ||
                (__COMPAT__ &&
                    isArray(newValue) &&
                    isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
            ) {
                
                // 如果满足上面条件中的一个，
                // 那么先清除副作用函数，然后调用 callWithAsyncErrorHandling函数，将新旧值 newValue和 oldValue传入该函数中，
                // 执行完毕后更新旧值 oldValue，避免在下一次执行回调函数 cb时获取到错误的旧值
                if (cleanup) {
                    cleanup()
                }
                callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE
                        ? undefined
                        : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
                            ? []
                            : oldValue,
                    onCleanup,
                ])
                // 在执行回调函数之后，将旧值更新为新值
                oldValue = newValue
            }
        } else {
            // watchEffect
            effect.run()
        }
    }

    // 创建一个 effect 副作用函数
    const effect = new ReactiveEffect(getter)
    // initial run
    // 初次执行
    if (cb) {
        // 如果是立即执行，那么执行一次 job 函数
        if (immediate) {
            job(true)
        } else {
            // 先拿到旧值
            oldValue = effect.run()
        }
    } else if (flush === 'post') {
        queuePostRenderEffect(
            effect.run.bind(effect),
            instance && instance.suspense,
        )
    } else {
        effect.run()
    }

    // 创建一个 scheduler 调度函数
    let scheduler
    if (flush === 'sync') {
        scheduler = job // the scheduler function gets called directly
    } else if (flush === 'post') {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
    } else {
        // default: 'pre'
        job.flags |= SchedulerJobFlags.PRE
        if (instance) job.id = instance.uid
        scheduler = () => queueJob(job)
    }
    // 设置调度函数在 effect 上
    effect.scheduler = scheduler

    const scope = getCurrentScope()

    // 创建一个handle对象，用于暂停、恢复
    const watchHandle = () => {
        effect.stop()
        if (scope) {
            remove(scope.effects, effect)
        }
    }
    watchHandle.pause = effect.pause.bind(effect)
    watchHandle.resume = effect.resume.bind(effect)
    watchHandle.stop = watchHandle

    // 清楚副作用函数
    if (__SSR__ && ssrCleanup) ssrCleanup.push(watchHandle)

    // return 出一个 handle 对象，用于暂停、恢复
    return watchHandle
}


// watch
// 首先创建一个 get 变量，用于获取 source 的值。

// 然后创建一个 job 函数，用于执行回调函数。在 job 内部对比新旧值，如果满足条件，那么执行回调函数。

// 创建一个 effect 副作用函数，通过 effect 去获取新值。

// 判断是否需要立即执行，如果需要，那么执行一次 job 函数。

// 创建一个 handle 对象，用于暂停、恢复。

// 返回 handle 对象。