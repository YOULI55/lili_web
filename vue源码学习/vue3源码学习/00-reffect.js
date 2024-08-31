// effect函数用于注册一个副作用函数（effect function），
// 这个副作用函数可以自动响应其内部使用的响应式数据的变化。
// 简单来说，就是当我们使用reactive或ref创建的响应式数据在这个副作用函数内被访问时，
// Vue会记住这个访问行为，并在数据变化时重新执行这个副作用函数


/**
 * fn：要注册为副作用的函数，当响应式数据变化时，这个函数会被重新执行。
 * options：可选参数，用于控制副作用的行为。常见的选项包括：
 *    - lazy：如果为true，则副作用函数不会立即执行，直到手动调用返回的runner函数。
 *    - scheduler：自定义的调度函数，用于控制副作用函数的重新执行时机。
 *    - onStop：当调用stop函数停止副作用时执行的回调函数。
 */
export function effect(fn, options) {
    // 如果fn已经是一个effect函数，则获取其原始函数进行重新包装
    if (fn.effect instanceof ReactiveEffect) {
        fn = fn.effect.fn
    }

    // 创建一个ReactiveEffect实例，封装副作用函数fn
    const _effect = new ReactiveEffect(fn, NOOP, () => {
        if (_effect.dirty) {
            _effect.run()
        }
    })

    // 应用传入的options配置到_effect实例上
    if (options) {
        extend(_effect, options)
        if (options.scope) recordEffectScope(_effect, options.scope)
    }

    // 如果不是懒执行（lazy为false），则立即执行一次副作用函数
    if (!options || !options.lazy) {
        _effect.run()
    }

    // 返回一个可以控制副作用执行的runner函数，并附加effect实例
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}


export class ReactiveEffect {
    //表示这个副作用是否处于活跃状态。如果为false，则副作用不会再响应依赖数据的变化。
    active = true
    //存储了这个副作用所依赖的所有数据的集合（Dep类型）。每个Dep代表一个响应式数据的依赖关系。
    deps = []

    /**
     * 某些属性或方法可以在ReactiveEffect类的实例被创建后添加或修改，computed属性就是一个例子。
     * 可选属性，这个属性用于指示副作用是否与计算属性相关联，可以在创建ReactiveEffect实例之后附加上去
     * @internal - @internal标记意味着这部分内容主要供框架内部使用，并非设计为库或框架的公开API的一部分
     */
    computed
    /**
     * @internal
     * 可选属性，表示是否允许这个副作用递归地调用自身
     */
    allowRecurse

    //可选回调函数，当这个副作用被停止时调用
    onStop
    // dev only：仅在开发模式下使用的回调函数，用于调试跟踪
    onTrack
    // dev only：仅在开发模式下使用的回调函数，用于触发更新
    onTrigger

    //_dirtyLevel等内部属性: 用于内部状态管理，比如判断副作用的脏检查级别等
    _dirtyLevel = DirtyLevels.Dirty

    _trackId = 0

    _runnings = 0

    _shouldSchedule = false

    _depsLength = 0

    /**
     * 构造函数
     * fn：副作用函数
     * trigger：触发函数（内部使用，通常为NOOP，即空操作）
     * scheduler：可选的调度器函数
     * scope：可选的作用域
     */
    constructor(fn, trigger, scheduler, scope) {
        this.fn = fn;
        this.trigger = trigger;
        this.scheduler = scheduler;
        recordEffectScope(this, scope)
    }

    /**
     * dirty属性的get方法在ReactiveEffect类中是用来确定副作用函数是否需要被重新执行的。这个机制主要用于优化计算属性和其他依赖缓存的场景
     */
    get dirty() {
        //检查_dirtyLevel：检查当前副作用的_dirtyLevel（脏检查级别）
        if (
            this._dirtyLevel === DirtyLevels.MaybeDirty_ComputedSideEffect ||
            this._dirtyLevel === DirtyLevels.MaybeDirty
        ) {
            //查询脏数据：为了确定是否真的需要重新计算，会将_dirtyLevel设置为QueryingDirty，
            this._dirtyLevel = DirtyLevels.QueryingDirty
            //并暂时停止依赖追踪（以避免在这个过程中不必要地收集新的依赖）
            pauseTracking()
            /**
             * 检查计算属性：遍历所有已注册的依赖（这些依赖代表副作用函数所依赖的数据）。
             */
            for (let i = 0; i < this._depsLength; i++) {
                const dep = this.deps[i]
                //如果其中的依赖是计算属性（dep.computed），则会尝试触发这些计算属性的重新计算（通过triggerComputed函数）。
                if (dep.computed) {
                    triggerComputed(dep.computed)
                    //如果在这个过程中发现_dirtyLevel变为Dirty，表示确实有数据变化，需要重新计算副作用函数，那么循环就会提前结束
                    if (this._dirtyLevel >= DirtyLevels.Dirty) {
                        break
                    }
                }
            }
            /**
             * 重置脏检查级别：如果遍历完所有依赖后_dirtyLevel仍然是QueryingDirty，
             * 表示没有发现需要更新的数据，那么将_dirtyLevel设置为NotDirty，意味着不需要重新执行副作用函数。
             */
            if (this._dirtyLevel === DirtyLevels.QueryingDirty) {
                this._dirtyLevel = DirtyLevels.NotDirty
            }
            //最后，恢复依赖追踪
            resetTracking()
        }
        //返回值：最后，通过检查_dirtyLevel是否大于等于Dirty来决定是否标记为"脏"，如果是，则表示需要重新执行副作用函数
        return this._dirtyLevel >= DirtyLevels.Dirty
    }

    set dirty(v) {
        this._dirtyLevel = v ? DirtyLevels.Dirty : DirtyLevels.NotDirty
    }

    /**
     * 执行副作用函数
     * 在执行之前，会设置全局的activeEffect为当前实例，以便在副作用函数执行期间能够收集依赖。
     * 执行完成后，恢复activeEffect和shouldTrack的状态。
     * 如果副作用当前不处于活跃状态，直接执行副作用函数而不进行依赖收集
     */
    run() {
        this._dirtyLevel = DirtyLevels.NotDirty
        if (!this.active) {
            return this.fn()
        }
        let lastShouldTrack = shouldTrack
        let lastEffect = activeEffect
        try {
            //shouldTrack设置为true，允许依赖收集
            shouldTrack = true
            /**
             * this引用的是ReactiveEffect类的当前实例
             * 将全局的activeEffect变量设置为当前的副作用实例
             */
            activeEffect = this
            /**
             * _runnings属性记录了当前副作用函数被执行的次数
             * 这个计数器主要用于内部管理，确保副作用的正确执行和清理
             */
            this._runnings++
            preCleanupEffect(this)
            return this.fn()
        } finally {
            postCleanupEffect(this)
            this._runnings--
            activeEffect = lastEffect
            shouldTrack = lastShouldTrack
        }
    }

    /**
     * 停止这个副作用响应其依赖数据的变化。在停止前后，会执行一些清理操作，并调用onStop回调（如果有的话）
     */
    stop() {
        if (this.active) {
            preCleanupEffect(this)
            postCleanupEffect(this)
            this.onStop?.()
            this.active = false
        }
    }
}

