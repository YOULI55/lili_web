const fs = require('fs');

// fs.unlink('./tst', res => {
//     if(res) {
//         console.log('删除失败error')
//         return
//     }
//     console.log('删除成功success')
// })

fs.rm('./tst', res => {
    if(res) {
        console.log('删除失败error')
        return
    }
    console.log('删除成功success')
})