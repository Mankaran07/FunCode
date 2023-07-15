const express = require('express');
const mongoose = require('mongoose');
const { Course, Course } = require("../db");
const {authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get('/',authenticateJwt , async (req, res) => {
    const courses = await Course.find({published: true}).populate('createdBy');
    res.json({courses});
});

router.get('/:id' , authenticateJwt , async (req,res) => {
  const {id} = req.params;
  let validId = mongoose.Types.ObjectId.isValid(id);
  if(!validId) {
    return res.status(404).json({message: 'Invalid Course ID'});
  }
  const course = await Course.findById(id);
  if(!course) return res.status(404).json({message: "Course doesn't exists"});
  res.json({currentCourse: course});
});

router.post('/:id', authenticateJwt , async (req, res) => {
  const {id} = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);
  if(!validId) return res.status(404).json({message:'Invalid Course ID'});
  
  const course = await Course.findById(id);
    if(course) {
      const user = await User.findOne({username: req.data.username});
      if(user) {
        const isPurchased = user.purchasedCourses.find((course) => {
          return String(course) === id;
        });
        if(isPurchased){
          return res.status(409).json({message:'Course already purchased'});
        }
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course Purchased Successfully' });
      }
      else res.status(403).json({message: 'User Not Found'});
    }
    else res.status(404).json({message: 'Course Not Found'});
});

module.exports = router;