const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = require("./event_model.js");
const RSO = require("./rso_model.js");

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

  publicEvents: {
    type: [Schema.Types.Event],
  },

  privateEvents: {
    type: [Schema.Types.Event],
  },

  university: {
      name: {
        type: String,
      },
      location: {
        type: String,
      },
      desc: {
        type: String,
      },
      numStudents: {
        type: Number,
        default: 0
      },

  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;