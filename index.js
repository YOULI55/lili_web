class MyPromise {
    constructor(executor){
      this.status = 'pending'
      this.value = undefined
      this.reason = undefined
      this.onResolvedCallBacks = []
      this.onRejectedCallbacks = []
      const resolve = (value) => {
      if (this.status === 'pending') {
           this,status = 'fulfilled'
           this.value = value
           this.onResolvedCallBacks.forEach(fn => fn())
  
         }
      }
       const reject = (reason) => {
          if (this.status === 'pending') {
           this,status = 'rejected'
           this.reason = reason
           this.onRejectedCallBacks.forEach(fn => fn())
          }
      }
  
      try{
     // 执行用户传入的执行器函数，并传入 resolve 和 reject 函数
        executor(resolve, reject)
      }catch(err){
        reject(err)
      }
    }
    then(onFulfilled, onRejected){
      if(this.status === 'fulfilled'){
        onFulfilled(this.value)
      }
       if(this.status === 'rejected'){
        onRejected(this.reason)
      }
       if(this.status === 'pending'){
        this.onResolvedCallBacks.push(()=> onFulfilled(this.value))
        this.onRejectedCallBacks.push(()=> onRejected(this.reason))
      }
    }
  }