const { time } = require('console');
const { truncate } = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId; 

// Schema of location that contains coordinates
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
Event
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
        default: Date.now()
    },

    // location of event, see geoSchema
    location: GeoSchema,

    // comments about event
    comments : {
        type: [{type: ObjectId}],
    },

    // event category => rso_event, private event, public event
    category: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

eventSchema.index({ location: "2dsphere" });

module.exports = Event;