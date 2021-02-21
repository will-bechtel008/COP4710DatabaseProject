const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Comments
    - userId
    - Text
    - Rating
    - TimeStamp
*/
const commentSchema = new Schema({
    userId: {
        type: mongoose.Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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