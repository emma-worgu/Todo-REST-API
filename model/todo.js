const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  todo: {type: String},
  checked: {type: Boolean, default: false},
  password: {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', userModel)