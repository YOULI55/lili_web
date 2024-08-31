const fs = require('fs')

fs.stat('./',(res,data) => {
    if(res) {
        console.log('查看失败')
        return
    }
    console.log('查看成功\r\n',data)
    console.log('判断是否是文件',data.isFile())
    console.log('判断是否是文件夹',data.isDirectory())
})