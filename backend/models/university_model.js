const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require("./event_model.js");
const User = require("./user_model.js");

/*
    RSO Name
    RSO_Events
    Students Array
*/

const universitySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        default: '',
    },

    privateEvents: {
        type: [Schema.Types.Event],
    },

    publicEvents: {
        type: [Schema.Types.Event],
    },

    students: {
        type: [Schema.Types.User],
    },
});

const RSO = mongoose.model('University', universitySchema);

module.exports = RSO;