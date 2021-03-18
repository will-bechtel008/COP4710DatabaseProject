// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');

// models
const RSO = require("../models/rso_model.js");
const Event = require("../models/event_model.js");
const User = require("../models/user_model.js");
const University = require("../models/university_model.js");

// add public event to university
router.post("/add", async (req, res) => {
    try {
        // variables
        const userid = req.body.userid;
        const eventType = req.body.eventType;
        const eventName = req.body.eventName;
        const desc = req.body.desc;
        const date = Date.now();
        const id = mongoose.Types.ObjectId();

        // check for user
        const user = await User.findOne({ _id: userid });

        // if user does not exist
        if (!user)
            return res.json('User does not exist.')
        
        // save usertype
        const userType = user.type;

        // NOT ALLOWED TO CREATE EVENT TYPE ERRORS
        // only super admins can create public univerity events
        if (eventType == "public_event" && userType != "superadmin") {
            return res.json('Only superadmins can create public events for universities.')
        }
            
        // only superadmins and admins can create private events
        if (eventType == "private_event" && userType == "normal") {
            return res.json('Only superadmins and admins can create private events for universities.')
        }
           
        // only admins can create rso events
        if (eventType == "rso_event" && userType != "admin") {
            return res.json('Only admins can create rso events for universities.')
        }

        // MISSING DATA ERRORS
        // only super admins can create public univerity events
        if (eventType == "public_event" && user.university == null) {
            return res.json('Missing university data.')
        }
            
        // only superadmins and admins can create private events
        if (eventType == "private_event" && user.university == null) {
            return res.json('Missing university data.')
        }
           
        // only admins can create rso events
        if (eventType == "rso_event" && user.rso == null) {
            return res.json('Missing rso data.')
        }
  
        // create new event
        const newEvent = new Event({ _id: id, eventName, desc, date, category: eventType});

        // saves event
        newEvent.save()

        // update public events
        if (eventType == "public_event") {
            const eventCreated = await University.findByIdAndUpdate((user.university), {$push: {publicEvents: id }});
            res.json('New public event saved.')
        } 
        
        // update private events
        if (eventType == "private_event") {
            const eventCreated = await University.findByIdAndUpdate((user.university), {$push: {privateEvents: id }});
            res.json('New private event saved.')
        }
        
        // update rso events
        if (eventType == "rso_event") {
            const eventCreated = await RSO.findByIdAndUpdate((user.rso), {$push: {rsoEvents: id }});
            res.json('New rso event saved.')
        }
            
    // error handling
    } catch (err) {
    }
});

// add comment to event
router.post("/comment", async (req, res) => {
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
        const newComment = new Event({ _id: id, userid, text, rating, timestamp});

        // saves comment
        newComment.save()

        // updates user info
        const updateEvent = await Event.findByIdAndUpdate((eventid), {$push: {comments: id }})
            
        // university joined message
        if (updateEvent)
            res.json('Comment has been added to event.')
            
    // error handling
    } catch (err) {
    }
});


// export
module.exports = router;