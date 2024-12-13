const fs = require('fs');

const readStream = fs.createReadStream('./流式写入.txt');

readStream.on('data', res => {
    // 每次读取65536字节的数据 => 64KB
    console.log(res.toString())
})

readStream.on('end',() => {
    console.log('读取完成')
})