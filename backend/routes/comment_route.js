// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');

// models
const Comment = require("../models/comment_model.js");
const Event = require("../models/event_model.js");
const User = require("../models/user_model.js");

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
        const newComment = new Comment({ _id: id, userid, text, rating, timestamp});

        // saves comment
        //newComment.save()

        // updates user info
        const updateEvent = await Event.findByIdAndUpdate((eventid), {$push: {comments: newComment }})
            
        // university joined message
        if (updateEvent)
            res.json('Comment has been added to event.')
            
    // error handling
    } catch (err) {
    }
});

// export
module.exports = router;