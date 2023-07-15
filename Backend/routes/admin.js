const express = require('express');
const mongoose = require('mongoose');
const { Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const {secret} = require("../middleware/auth");
const {validateCredentials} = require("../middleware/valid");

const router = express.Router();


router.post('/signup', validateCredentials, async (req, res) => {
    const {username , password} = req.body;
    // If one of the field are empty
    if(!username || !password) {
        return res.status(400).json({message : 'Username and password are required'});
    }
    const admin = await Admin.findOne({username});
    // If the username already exist in the database
    if(admin) return res.status(409).json({message: 'Admin Already Exist, Please Login'});
    // Add the new user to the database
    const newAdmin = new Admin({username , password});
    await newAdmin.save();
    const token = jwt.sign({username , role:'Admin'} , secret , {expiresIn: '1h'});
    res.json({message: 'Admin Created Successfully' , token});
    
});

router.post('/login', validateCredentials , async (req, res) => {
    const {username , password} = req.body;
    // If one of the field are empty
    if(!username || !password) {
        return res.status(400).json({message : 'Username and password are required'});
    }
    const admin = await Admin.findOne({username , password});
    if(admin) {
      const token = jwt.sign({username , role:'Admin'} , secret , {expiresIn: '1h'});
      res.json({message: 'Logged In Successfully' , token});
    }
    else res.status(401).json({message:'Incorrect Username or Password'});
});

module.exports = router;