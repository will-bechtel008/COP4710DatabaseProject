// libraries and packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/user_model.js");
const RSO = require("../models/rso_model.js");
const Event = require("../models/event_model.js");
const University = require("../models/university_model.js");

// env config
require("dotenv").config();

// add user
router.post("/add", async (req, res) => {
  try {
    // read in data for predefined user
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const rso = null
    const university = null

    // username cannot be empty string
    if (username == '')
        return res.status(400).json({ msg: "Username cannot be empty string." })

    // password cannot be empty string
    if (password == '')
        return res.status(400).json({ msg: "Password cannot be empty string." })

    // check user
    const userExists = await User.findOne({ username: username })

    // if user already exists
    if (userExists)
        return res.status(400).json({ msg: "User already exists." })
    
    // encrypt password
    const encrptor = await bcrypt.genSalt();
    const phash = await bcrypt.hash(password, encrptor);

    // create new user
    const newUser = new User({ username, password: phash , type, rso, university});

    // saves user
    newUser.save()

    // new user message
    res.json('New user has been added.')
    
    // error handling
  } catch (err) {
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    // login information
    const username = req.body.username;
    const password = req.body.password;

    // requires username and password
    if (!username || !password)
      return res.status(400).json({ msg: "Not all field information has been entered." })

    // check user
    const user = await User.findOne({ username: username });
    
    // if user exists
    if (!user)
      return res.status(400).json({ msg: "User does not exist." });

    // check password
    const passwordCheck = await bcrypt.compare(password, user.password);

    // if password is not valid
    if (!passwordCheck)
      return res.status(400).json({ msg: "Incorrect Password." });


    // login message
    res.json({ userid: user._id, userType: user.type})

    // error handling
  } catch (err) {
  }
});

// get organizations
router.post("/organizations", async (req, res) => {
  try {
    // arrays
    let rsos = []
    let universities = []

    // search for user information
    rsos = await RSO.find();
    universities = await University.find();

    orgs = (rsos.concat(universities))

   // return user data
   // return savings data
   // return checking data
   res.json(
     {
        rsos: rsos, 
        universities: universities, 
        orgs: orgs,
     });

    // error handling
  } catch (err) {
  }
});

// get events
router.post("/events", async (req, res) => {
  try {
    // userid
    const userid = req.body.userid;

    // get user data
    const user = await User.findById(userid);

    let university = []
    let rso = []
    let publicEvents = []
    let privateEvents = []
    let rsoEvents = []
    let EventData = []

    // log users uni and rso
    console.log(user.university)
    console.log(user.rso)

    // get public events
    publicEvents = await Event.find({eventType: 'public_event'});

    // get university info
    // and private events
    if (user.university) {
      university = await University.findOne({ _id: user.university });
      privateEvents = await Event.find({eventType: 'private_event', org: university.name});
    }

    // get rso info
    // and get rso events
    if (user.rso) {
      rso = await RSO.findOne({ _id: user.rso });
      rsoEvents = await Event.find({eventType: 'rso_event', org: rso.name});
    }

    EventData = (publicEvents.concat(privateEvents)).concat(rsoEvents)

    console.log(EventData)

    res.json(
      {
        publicEvents: publicEvents,
        privateEvents: privateEvents,
        rsoEvents: rsoEvents,
        Events: EventData
      });

    // error handling
  } catch (err) {
  }
});



// export
module.exports = router;