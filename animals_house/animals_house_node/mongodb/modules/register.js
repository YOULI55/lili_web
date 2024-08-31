const db = require('../index')
const mongoose = require('mongoose');

const register = new Promise((resolve,reject) => {
    db.then(() => {
        const { Schema } = mongoose;
        const userSchema = new Schema({
            name: String,
            password: String,
            email: String,
        });
        const User = mongoose.model('User', userSchema);
        resolve(User)
    }).catch(() => {
        reject('注册出错～')
    })
})

module.exports = register
