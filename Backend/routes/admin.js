const express = require('express');
const { Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { secret } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();


router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({message: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});


router.post('/signup', async (req, res) => {
    const {username , password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin) res.status(403).json({message: 'Admin Already Exist'});
    else {
      const newAdmin = new Admin({username , password});
      await newAdmin.save();
      const token = jwt.sign({username , role:'admin'} , secret , {expiresIn: '1h'});
      res.json({message: 'Admin Created Successfully' , token});
    }
});

router.post('/login', async (req, res) => {
    const {username , password} = req.headers;
    const admin = await Admin.findOne({username , password});
    if(admin) {
      const token = jwt.sign({username , role:'admin'} , secret , {expiresIn: '1h'});
      res.json({message: 'Logged In Successfully' , token});
    }
    else res.status(403).json({message:'Invalid Username or Password'});
});

router.post('/courses', authenticateJwt , async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'Course Created Successfully' , courseId : course.id});
});

router.put('/courses/:courseId', authenticateJwt , async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new: true});
    if(course) res.json({message: 'Course Updated Successfully'});
    else res.status(404).json({message: 'Course Not Found'});
});

router.get('/courses', authenticateJwt , async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});

module.exports = router;