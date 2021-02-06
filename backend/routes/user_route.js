const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user_model.js");
const jwt = require("jsonwebtoken");
const RSO = require("../models/rso_model.js");
const University = require("../models/university_model.js");
require("dotenv").config();

// add user
router.post("/add", async (req, res) => {
  try {
    // read in data for predefined user
    const username = req.body.username;
    const password = req.body.password;

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
    const newUser = new User({ username, password: phash });

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
    const userExists = await User.findOne({ username: username });
    
    // if user exists
    if (!userExists)
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
    res.json({ token, user: { id: user._id, username: user.username } })

    // error handling
  } catch (err) {
  }
});

// export
module.exports = router;