var lineReader = require('reverse-line-reader');

let lineCount = 0;
lineReader.eachLine('./座右铭.txt', function(line, last) {
  console.log(line);
  lineCount ++;
  if (lineCount === 5) {
    return false;
  }
});