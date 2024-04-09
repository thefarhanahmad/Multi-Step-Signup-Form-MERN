const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
