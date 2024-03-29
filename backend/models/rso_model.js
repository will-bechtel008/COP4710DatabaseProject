const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId; 
const Event = require("./event_model.js");
const User = require("./user_model.js");

/*
    RSO Name
    RSO_Events
    Students Array
*/

var rsoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rsoEvents: {
        type: [{type: ObjectId}],
    },
    members: {
        type: [{type: ObjectId}],
    },
    location: {
        type: String,
        required: true
    },
    activated: {
        type: String,
        default: "INACTIVE"
    },
    orgType: {
        type: String,
        default: 'Rso'
    }
});

const RSO = mongoose.model('Rso', rsoSchema);

module.exports = RSO;