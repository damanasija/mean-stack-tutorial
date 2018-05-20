const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true, unique: true},
  password: { type: String, required: true},
  email: {type: String, required: true, unique: true}
});
userSchema.plugin(uniqueValidator, { message: "{PATH}"});


module.exports = mongoose.model('User', userSchema);