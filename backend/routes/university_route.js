// libraries and packages
const router = require("express").Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId; 

// models
const User = require("../models/user_model.js");
const University = require("../models/university_model.js");

// add university
router.post("/add", async (req, res) => {
    try {
      // variables
      const userid = req.body.userid;
      const name = req.body.name;
      const location = req.body.location;
      const desc = req.body.desc;
      const id = mongoose.Types.ObjectId();

      // check for user
      const user = await User.findOne({ _id: userid });

      // if user does not exist
      if (!user)
        return res.json('User does not exist.')

      // save usertype
      const userType = user.type;

      // only super admins can create universities
      if (userType != "superadmin")
        return res.json('Only superadmins can create universities.')

      // check if university exists
      const universityExists = await University.findOne({ name: name })

      // if university already exists
      if (universityExists)
        return res.json('University already exists.')
    
      // creates new university
      const newUniversity = new University({ _id: id, name, location, desc});
  
      // saves new university
      newUniversity.save()

      // updates user info
      const updateUser = await User.findByIdAndUpdate((userid), {university: id})

      // student data
      const studentData = ObjectId(userid);

      // updates univeristy info
      const updateUniversity = await University.findByIdAndUpdate((id), {$push: {students: studentData }});
        
      // new university created message
      if (updateUser && updateUniversity)
        res.json('User has created university.')
   
      // error handling
    } catch (err) {
    }
  });

// join university
router.post("/join", async (req, res) => {
  try {
    // variables
    const userid = req.body.userid;
    const universityid = req.body.universityid;

    // check for user
    const user = await User.findOne({ _id: userid });

    // if user does not exist
    if (!user)
      return res.json('User does not exist.')
    
    // save usertype
    const userType = user.type;

    // if user is not a admin or normal user
    if (userType == "superadmin")
      return res.json('Only normal users and admins can join universities.')

    // check if university exists
    const universityExists = await University.findOne({ _id: universityid });

    // if user doest not exist
    if (!universityExists)
      return res.json('University does not exists.')

    // updates user info
    const updateUser = await User.findByIdAndUpdate((userid), {university: universityid})

    // member data
    const studentData = ObjectId(userid);

    // updates univeristy info
    const updateUniversity = await University.findByIdAndUpdate((universityid), {$push: {students: studentData }});
     
    // university joined message
    if (updateUser && updateUniversity)
      res.json('User has joined university.')
     
    // error handling
  } catch (err) {
  }
});

// export
module.exports = router;