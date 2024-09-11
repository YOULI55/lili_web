
沙箱机制

1.快照沙箱：通过创建主应用 window 的快照，对比 快照和 window 来进行恢复和隔离

2.window沙箱：浅拷贝 window，每次更新去对比每个属性

3.proxy沙箱：使用 Proxy 创建每个页面的代理对象


通讯
globalState
当数据发生改变时，通知观察者