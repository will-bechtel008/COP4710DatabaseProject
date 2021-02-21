const { time } = require('console');
const { truncate } = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = require("./comments_model.js");

const GeoSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: "Point"
    },

    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

/*
Events
    description
    date
    location
    comments
    event category => rso_event, private event, public event
*/
const eventSchema = new Schema({
    // name of event
    eventName: {
        type: String,
        required: true
    },

    // description of event
    desc: {
        type: String,
        default: ''
    },

    // date of event
    date: {
        type: Date,
    },

    // location of event, see geoSchema
    location: GeoSchema

    // comments about event
    comments : {
        type: Schema.Types.ObjectId,
        ref: Comments
    },

    category: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

eventSchema.index({ location: "2dsphere" });

module.exports = Event;