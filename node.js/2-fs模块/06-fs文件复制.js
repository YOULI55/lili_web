const fs = require('fs');

// 直接复制
fs.readFile('./copyimg.jpg',(res,data) => {
    if(res) {
        console.log('读取失败error')
        return
    }
    fs.writeFile('./copyimg1.jpg',data,file => {
        if(file) {
            console.log('写入失败error')
            return
        }
        console.log('复制图片copyimg1成功')
    })
})

// 流式复制 第二种方法占用内存少
const readFile = fs.createReadStream('./copyimg.jpg');
const writeFile = fs.createWriteStream('./copyimg2.jpg')

readFile.on('data',res => {
    writeFile.write(res)
})
readFile.on('end',() => {
    console.log('读取完成')
})