`Vue.use`主要是执行`install`方法，而`install`主要也是执行`Vue.prototype`方法。

所以，其实`Vue.use()`方法的核心就是`Vue.prototype`
总结 把vue理解成一棵树，`Vue.use`和`Vue.prototype`都是在这颗树上挂载插件的方式
不同之处是使用`vue.prototype`，插件不需要实现`install`方法，简单粗暴，拿来就用，但是灵活性不如`Vue.use()`, 而`Vue.use()`，却要求插件必须实现`instal`方法或者该插件本身就是函数，在`install`方法可以完成自己的逻辑， 所以`Vue.use()`的方式更加的强大，灵活，扩展性更好。但是两者并没有高低之分， 只是有着各自的应用场景，`Vue.prototype`适合于非Vue生态的插件，而`Vue.use()`适合于Vue生态内的插件，如echarts,两者互相配合，一个简单实用，一个灵活扩展性好。而且，`Vue.use`的实现依赖于`Vue.prototype`，最本质的理解就是`Vue.use`包裹着`Vue.prototype`进一步的封装了一次。