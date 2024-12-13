const fs = require('fs')

const stream = fs.createWriteStream('./流式写入.txt')

stream.write('乌云在我们心里搁下一块阴影\r\n');
stream.write('我聆听沉寂已久的心情\r\n');

stream.close()