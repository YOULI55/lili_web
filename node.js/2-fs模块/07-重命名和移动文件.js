const fs = require('fs');

fs.rename('./copyimg.jpg','./重命名的img.jpg',res => {
    if(res) {
        console.log('error失败了')
        return
    }
    console.log('重命名成功')
})