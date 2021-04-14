// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');

// models
const Comment = require("../models/comment_model.js");
const Event = require("../models/event_model.js");
const User = require("../models/user_model.js");

// object id
const ObjectId = require('mongodb').ObjectId; 

// add comment to event
router.post("/add", async (req, res) => {
    try {
      // variables
        const userid = req.body.userid;
        const eventid = req.body.eventid;
        const text = req.body.text;
        const rating = req.body.rating;
        const timestamp = Date.now();
        const id = mongoose.Types.ObjectId();

        // check for user
        const user = await User.findOne({ _id: userid });

        // if user does not exist
        if (!user)
            return res.json('User does not exist.')
  
        // create new comment
        const newComment = new Comment({ _id: id, userid: userid, text, rating, timestamp});

        // saves comment
        newComment.save()

        // updates event
        const updateEvent = await Event.findByIdAndUpdate((eventid), {$push: {comments: newComment }})
            
        res.json('Comment has been added to event.')
            
    // error handling
    } catch (err) {
    }
});

// update comment
router.post("/update", async (req, res) => {
    try {
      // variables
      const userid = req.body.userid;
      const eventid = req.body.eventid;
      const commentid = req.body.commentid;
      const text = req.body.text;
      const rating = req.body.rating;
      const timestamp = Date.now();

        // check for user
        const user = await User.findOne({ _id: userid });

        // if user does not exist
        if (!user)
            return res.json('User does not exist.')

        // create new comment
        const newComment = new Comment({ _id: commentid, userid: userid, text, rating, timestamp });

        // update comment
        const updatedComment = await Comment.findByIdAndUpdate((commentid), {_id: commentid, userid: userid, text, rating, timestamp});

        // updates event by removing old comment
        const removeEvent = await Event.findByIdAndUpdate((eventid), {$pull: {comments: {_id: ObjectId(commentid) }}})

        // updates event by adding new comment
        const addEvent = await Event.findByIdAndUpdate((eventid), {$push: {comments: newComment }})

        // removed  message
        res.json('Comment has been updated.')
                
    // error handling
    } catch (err) {
    }
});

// delete comment
router.post("/delete", async (req, res) => {
    try {
      // variables
        const userid = req.body.userid;
        const eventid = req.body.eventid;
        const commentid = req.body.commentid;

        // check for user
        const user = await User.findOne({ _id: userid });

        // if user does not exist
        if (!user)
            return res.json('User does not exist.')

        // updates event
        const updateEvent = await Event.findByIdAndUpdate((eventid), {$pull: {comments: {_id: ObjectId(commentid) }}})

        res.json('Comment has been deleted.')
            
    // error handling
    } catch (err) {
    }
});

// export
module.exports = router;