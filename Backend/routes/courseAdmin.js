const express = require('express');
const mongoose = require('mongoose');
const { Course, Admin } = require("../db");
const {authenticateJwt, isAdmin } = require("../middleware/auth");

const router = express.Router();


router.post('/', authenticateJwt , isAdmin, async (req, res) => {
    const {title , description , imageLink , price , published} = req.body;
    // Course Details Shouldn't be Empty
    if(!title || !description || !imageLink || !price) {
        return res.status(400).json({message: 'Course details missing'});
    }
    // Couse Shouldn't Already Exist
    let course = await Course.findOne({title});
    if(course) return res.status(409).json({message:'Course already exists'});
    // Store the Course Details
    const createdBy = req.data.username;
    const admin = await Admin.findOne({username: createdBy});
    if(!admin) return res.status(404).json({message: 'Course Creator not found'});
    course = await Course.create({
        ...req.body,
        createdBy: admin._id
    });
    res.json({message: 'Course Created Successfully' , courseId : course.id});
});

router.put('/:id', authenticateJwt , isAdmin, async (req, res) => {
    const {id} = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);

    if(!validId) return res.status(404).json({message:'Invalid Course ID'});
    const {title , description , imageLink , price , published} = req.body;

    if(!title || !description || !imageLink || !price) {
        return res.status(400).json({message: 'Course details missing'});
    }
    let course = await Course.findById(id);
    if(!course) {
        return res.status(404).json({message: "Course doesn't exists"});
    }

    course = await Course.findByIdAndUpdate(id , req.body , {new: true});
    if(course) res.json({message: 'Course Updated Successfully'});
    else res.status(404).json({message: 'Course Not Found'});
});

router.get('/', authenticateJwt ,isAdmin, async (req, res) => {
    const courses = await Course.find({}).populate('createdBy');
    res.json({ courses });
});

router.get('/:id', authenticateJwt,isAdmin, async (req, res) => {
    const {id} = req.params;
    const validId = mongoose.Types.ObjectId.isValid(id);
    //Wrong Course ID
    if(!validId) return res.status(404).send({message:'Invalid Course ID'});
    const course = await Course.findById(id).populate('createdBy');
    //The required Course Doesn't exist
    if(!course) return res.send(404).json({message:"Course doesn't exists"});
    res.json({currentCourse : course });
});

router.delete('/:id' , authenticateJwt , isAdmin , async (req,res) => {
    const {id} = req.params.id;
    //Check whether Course Exists
    const validId = mongoose.Types.ObjectId.isValid(id);

    if(!validId) return res.status(404).json({message: 'Invalid Course ID'});
    
    let course = await Course.findById(id);
    if(!course) return res.status(404).json({message: "Course doesn't exisists"});
    course = await Course.findByIdAndDelete(id , {
        new: true,
    });
    if (!course) return res.status(404).send({ message: "Course not found" });
    
      res.send({ message: "Course Deleted Successfully" });
});

module.exports = router