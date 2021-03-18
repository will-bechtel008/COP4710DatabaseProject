const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectId; 

/*
    Comments
    - userId
    - Text
    - Rating
    - TimeStamp
*/

const commentSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },

    text: {
        type: String,
        required: true
    },

    rating: {
        type: Number
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;