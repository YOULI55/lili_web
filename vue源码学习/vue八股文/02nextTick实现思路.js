// nextTick内部使用到了promise 和 setTimeout

// 优先级: promise > setTimeout ，如果浏览器支持promise，那么就使用promise，否则使用setTimeout

// vue中DOM的更新是异步的，当数据发生变化时，vue并不会立即更新DOM，
// 而是等待同步代码执行完毕后，再执行更新操作，这样可以减少DOM操作次数，提高性能。

// vue中的nextTick方法就是用来处理这种情况的，它会在下次DOM更新循环结束之后执行延迟回调，
// 在修改数据之后立即使用这个方法，可以获取更新后的DOM。