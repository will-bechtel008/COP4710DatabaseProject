const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RSO = require("../models/rso_model.js");
const University = require("../models/university_model.js");

const userSchema = new Schema({
  username: {type: String, required: true, minlength: 1},
  password: {type: String, required: true, minlength: 1},
  type: {type: String},
  rso: {type: Schema.Types.ObjectId, ref: RSO},
  university: {type: Schema.Types.ObjectId, ref: University},
});

const User = mongoose.model('User', userSchema);

module.exports = User;