const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RSO = require("./rso_model.js");
const University = require("./university_model.js");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1
  },

  password: {
    type: String,
    required: true,
    minlength: 1
  },

  // Normal, Admin, SuperAdmin
  type: {
    type: String
    default: 'standard'
  },

  rso: {
    type: Schema.Types.ObjectId,
    ref: RSO
  },

  university: {
    type: Schema.Types.ObjectId,
    ref: University
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;