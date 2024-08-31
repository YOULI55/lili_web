const fs = require('fs');

// 单个创建
fs.mkdir('./file1',res => {
    if(res) {
        console.log('创建失败')
        return
    }
    console.log('创建成功')
})

// 递归创建
fs.mkdir('./file2/file3',{ recursive: true },res => {
    if(res) {
        console.log('创建失败')
        return
    }
    console.log('创建成功')
})

// 读取文件夹
fs.readdir('./',(res,data) => {
    if(res) {
        console.log('读取失败')
        return
    }
    console.log('读取成功\r\n',data)
})

// 单个删除文件夹
fs.rmdir('./file1',(res) => {
    if(res) {
        console.log('删除失败')
        return
    }
    console.log('删除成功')
})

// 递归删除文件夹
fs.rmdir('./file2',{ recursive: true },(res) => {
    if(res) {
        console.log('删除失败')
        return
    }
    console.log('删除成功')
})