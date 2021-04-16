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
        type: [{type: ObjectId}],
    },

    publicEvents: {
        type: [{type: ObjectId}],
    },

    students: {
        type: [{type: ObjectId}],
    },

    orgType: {
        type: String,
        default: 'University'
    }
});

const University = mongoose.model('University', universitySchema);

module.exports = University;