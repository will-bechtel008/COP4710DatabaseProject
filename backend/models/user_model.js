const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RSO = require("../models/rso_model.js");
const University = require("../models/university_model.js");

const userSchema = new Schema({
  username: {type: String, required: true, minlength: 1},
  password: {type: String, required: true, minlength: 1},
  // normal, admin, superadmin
  type: {type: String},
  rso: {type: Schema.Types.ObjectId},
  university: {type: Schema.Types.ObjectId},
});

const User = mongoose.model('User', userSchema);

module.exports = User;