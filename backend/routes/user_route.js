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
router.get("/organizations", async (req, res) => {
  try {
    // search for user information
    const rsos = await RSO.find();
    const universities = await University.find();

   // return user data
   // return savings data
   // return checking data
   res.json(
     {
        rsos: rsos, 
        universities: universities, 
     });

    // error handling
  } catch (err) {
  }
});

// get events
router.get("/events", async (req, res) => {
  try {
    // search for user information
    const events = await Event.find();

   res.json(
     {
        events: events,
     });

    // error handling
  } catch (err) {
  }
});



// export
module.exports = router;