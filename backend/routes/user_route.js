// libraries and packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/user_model.js");
const RSO = require("../models/rso_model.js");
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

    // use token key from env file
    const tokenKey = process.env.KEY;

    // jason web token for login verification
    const token = jwt.sign({ id: user._id }, tokenKey);

    // login message
    res.json({ token, user: { id: user._id, type: user.type, username: user.username } })

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
    // userid
    const userid = req.body.userid;

    // get user data
    const user = await User.findById(userid);

    let university = null
    let rso = null
    let publicEvents = null
    let privateEvents = null
    let rsoEvents = null
    
    console.log("HERE1")
    console.log(user.university)

    // get university info
    if (user.university)
      university = await University.findOne({ _id: user.university });
      
    console.log("HERE2")
    
      // get rso info
    if (user.rso)
      rso = await RSO.findOne({ _id: user.rso });
    
    console.log("HERE3")
    
    // public events
    publicEvents = await Event.find(eventType === 'public_event');
    console.log("HERE4")
    // private events
    privateEvents = await Event.find(eventType === 'private_event');

    // rso events
    rsoEvents = await Event.find(eventType === 'rso_event');
    
    res.json(
      {
        publicEvents: publicEvents,
        privateEvents: privateEvents,
        rsoEvents: rsoEvents,
      });

    // error handling
  } catch (err) {
  }
});



// export
module.exports = router;