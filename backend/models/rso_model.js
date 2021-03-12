const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require("./event_model.js");
const User = require("./user_model.js");

/*
    RSO Name
    RSO_Events
    Students Array
*/
const rsoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    RSO_events: {
        type: [Schema.Types.Event],
    },
    members: {
        type: [Schema.Types.User],
    },
});

const RSO = mongoose.model('Rso', rsoSchema);

module.exports = RSO;