const fs = require('fs')

const files = fs.readdirSync('./')
console.log(files)

for(let item of files) {
    const name = item.split(',').join('');
    console.log(name)
    if(name[0] === '0') {
        fs.renameSync(`./${item}`,`./${name}`)
    }
}