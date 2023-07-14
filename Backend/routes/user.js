const express = require('express');
const { authenticateJwt, secret } = require("../middleware/auth");
const { User, Course } = require("../db/index");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username , password} = req.body;
    if(username.length == 0 || password.length == 0) {
        return res.status(404).json({message:'Enter valid username and password'});
    }
    const user = await User.findOne({username});
    if(user) res.status(403).json({message: 'User Already Exist'});
    else {
      const newUser = new User({username , password});
      await newUser.save();
      const token = jwt.sign({username , role:'user'} , secret , {expiresIn: '1h'});
      res.json({message: 'User Created Successfully' , token});
    }
});

router.post('/login', async (req, res) => {
    const {username , password} = req.headers;
    const user = await User.findOne({username , password});
    if(user) {
      const token = jwt.sign({username , role:'user'} , secret , {expiresIn: '1h'});
      res.json({message: 'Logged In Successfully' , token});
    }
    else res.json({message: 'Invalid Username or Password'});
});

router.get('/courses',authenticateJwt , async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
});

router.post('/courses/:courseId', authenticateJwt , async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if(course) {
      const user = await User.findOne({username: req.user.username});
      if(user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course Purchased Successfully' });
      }
      else res.status(403).json({message: 'User Not Found'});
    }
    else res.status(404).json({message: 'Course Not Found'});
});
  
router.get('/purchasedCourses', authenticateJwt , async (req, res) => {
    const user =  await User.findOne({username: req.user.username}).populate('purchasedCourses');
    if(user) res.json({purchasedCourses: user.purchasedCourses || []});
    else res.status(403).json({message:'User Not Found'});
});

module.exports = router;