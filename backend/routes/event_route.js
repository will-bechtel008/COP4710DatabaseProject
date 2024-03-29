// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');

// models
const RSO = require("../models/rso_model.js");
const Event = require("../models/event_model.js");
const User = require("../models/user_model.js");
const University = require("../models/university_model.js");

router.post("/get", async (req, res) => {
    try {
        // eventid
        const eventid = req.body.eventid;

        const event = await Event.findOne({_id: eventid});

        // requires eventid
        if (!event)
            return res.json('Event does not exist.');

        res.json(event);
    }
    catch (err) {};
})

// add public event to university
router.post("/add", async (req, res) => {
    try {
        // variables
        const userid = req.body.userid;
        const eventType = req.body.eventType;
        const eventName = req.body.eventName;
        const desc = req.body.desc;
        const date = req.body.date;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const id = mongoose.Types.ObjectId();

        // check for user
        const user = await User.findOne({ _id: userid });

        // if user does not exist
        if (!user)
            return res.json('User does not exist.')
        
        // // scheduling conflict
        // const conflict = await Event.find({date: date})
        // if (conflict) {
        //     return res.json('Scheduling Conflict')
        // }

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

        // update public events
        if (eventType == "public_event") {
            // user university
            const userUniversity = await University.findOne({ _id: user.university })
            
            // create new event
            const newEvent = new Event({ _id: id, eventName, desc, date, eventType, org: userUniversity.name, longitude, latitude});

            // saves event
            newEvent.save()
            
            const eventCreated = await University.findByIdAndUpdate((user.university), {$push: {publicEvents: id }});
            res.json('New public event saved.')
        } 
        
        // update private events
        if (eventType == "private_event") {
            // user university
            const userUniversity = await University.findOne({ _id: user.university })
            
            // create new event
            const newEvent = new Event({ _id: id, eventName, desc, date, eventType, org: userUniversity.name, longitude, latitude});

            // saves event
            newEvent.save()

            const eventCreated = await University.findByIdAndUpdate((user.university), {$push: {privateEvents: id }});
            res.json('New private event saved.')
        }
        
        // update rso events
        if (eventType == "rso_event") {
            // user university
            const userRSO = await RSO.findOne({ _id: user.rso })
    
            // create new event
            const newEvent = new Event({ _id: id, eventName, desc, date, eventType, org: userRSO.name, longitude, latitude});

            // saves event
            newEvent.save()

            const eventCreated = await RSO.findByIdAndUpdate((user.rso), {$push: {rsoEvents: id }});
            res.json('New rso event saved.')
        }
            
    // error handling
    } catch (err) {
    }
});

// export
module.exports = router;