const express = require('express');
const { authenticateJwt, secret } = require("../middleware/auth");
const { User, Course } = require("../db/index");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username , password} = req.body;
    if(!username || !password) {
      return res.status(400).json({message:'Username and Password are required.'});
    }
    const user = await User.findOne({username});
    if(user) return res.status(409).json({message: 'User Already Exist, Please Login'});
    
    const newUser = new User({username , password});
    await newUser.save();
    const token = jwt.sign({username , role:'User'} , secret , {expiresIn: '1h'});
    res.json({message: 'User Created Successfully' , token});
});

router.post('/login', async (req, res) => {
    const {username , password} = req.body;
    if(!username || !password) {
      return res.status(400).json({message:'Username and Password are required.'});
    }
    const user = await User.findOne({username , password});
    if(user) {
      const token = jwt.sign({username , role:'User'} , secret , {expiresIn: '1h'});
      return res.json({message: 'Logged In Successfully' , token});
    }
    res.status(401).json({message: 'Incorrect Username or Password'});
});
  
router.get('/purchasedCourses', authenticateJwt , async (req, res) => {
    const {username} = req.data;

    const user =  await User.findOne({username}).populate('purchasedCourses');

    if(user) res.json({purchasedCourses: user.purchasedCourses || []});
    else res.status(403).json({message:'User Not Found'});
});

module.exports = router;