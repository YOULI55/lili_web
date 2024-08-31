const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDataBase')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const { Schema } = mongoose;
const recordSchema = new Schema({
    matter: String,
    timer: String,
    type: String,
    amount: String,
    remark: String,
  });
const Record = mongoose.model('Record', recordSchema);

module.exports = {
    Record
};