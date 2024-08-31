const mongoose = require('mongoose');
const {
    hostName,
    port,
    dataBaseName
} = require('./config/index')

const db = new Promise((resolve,reject) => {
    mongoose.connect(`mongodb://${hostName}:${port}/${dataBaseName}`).then(() => {
        console.log('Connected to MongoDB')
        resolve()
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err)
        reject()
    });
})

module.exports = db;
