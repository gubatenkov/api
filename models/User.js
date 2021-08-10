const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please, provide name'],
  },
  email: {
    type: String,
    required: [true, 'please, provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please, provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please, provide password'],
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.TOKEN_SECRET,
    { expiresIn: '30d' }
  );
};

UserSchema.methods.comparePasswords = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
