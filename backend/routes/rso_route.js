// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId; 

// models
const User = require("../models/user_model.js");
const RSO = require("../models/rso_model.js");

// add rso
router.post("/add", async (req, res) => {
    try {
      // variables
      const userid = req.body.userid;
      const name = req.body.name;
      const id = mongoose.Types.ObjectId();

      // check for user
      const user = await User.findOne({ _id: userid });

      // if user does not exist
      if (!user)
        return res.json('User does not exist.')
      
      // save usertype
      const userType = user.type;

      // only admins can create rsos
      if (userType != "admin")
        return res.json('Only admins can create rsos.')

      // check if exists
      const rsoExists = await RSO.findOne({ name: name })

      // if RSO already exists
      if (rsoExists)
        return res.json('RSO already exists.')

      // create new rso
      const newRSO = new RSO({ _id: id, name});

      // saves new rso
      newRSO.save()

      // updates user info
      const updateUser = await User.findByIdAndUpdate((userid), {rso: id})
      
      // member data
      const memberData = ObjectId(userid);

      // updates rso info
      const updateRSO = await RSO.findByIdAndUpdate((id), {$push: {members: memberData }});

      // new rso message
      if (updateUser && updateRSO)
        res.json('New RSO has been added.')

      // error handling
    } catch (err) {
    }
  });

// join rso
router.post("/join", async (req, res) => {
  try {
    // variables
    const userid = req.body.userid;
    const rsoid = req.body.rsoid;

    // check for user
    const user = await User.findOne({ _id: userid });

    // if user does not exist
    if (!user)
      return res.json('User does not exist.')
    
    // save usertype
    const userType = user.type;

    if (userType != "normal")
      return res.json('Only normal users can join rsos.')

    // check if RSO exists
    const rsoExists = await RSO.findOne({ _id: rsoid });

    // if user doest not exist
    if (!rsoExists)
      return res.json('Rso does not exists.')
    
    // updates user info
    const updateUser = await User.findByIdAndUpdate((userid), {rso: rsoid})

    // member data
    const memberData = ObjectId(userid);

    // updates rso info
    const updateRSO = await RSO.findByIdAndUpdate((rsoid), {$push: {members: memberData }});

    // join rso message
    if (updateUser && updateRSO)
      res.json('User has joined rso.')

    // error handling
  } catch (err) {
  }
});

// export
module.exports = router;