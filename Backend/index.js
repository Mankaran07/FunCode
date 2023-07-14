const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const secret = 'Admin';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const User = mongoose.model('User' , userSchema);
const Admin = mongoose.model('Admin' , adminSchema);
const Course = mongoose.model('Course' , courseSchema);

const authenticateJwt = (req,res,next) => {
  const autoHeader = req.headers.authorization;
  if(autoHeader) {
    const token = autoHeader.split(' ')[1];
    jwt.verify(token , secret , (err,user) => {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  else res.sendStatus(401);
};

mongoose.connect('mongodb+srv://mankaransingh39:admin@cluster0.ges4flm.mongodb.net/courses' , {useNewUrlParser: true, useUnifiedTopology: true});

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
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

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const {username , password} = req.headers;
  const admin = await Admin.findOne({username , password});
  if(admin) {
    const token = jwt.sign({username , role:'admin'} , secret , {expiresIn: '1h'});
    res.json({message: 'Logged In Successfully' , token});
  }
  else res.status(403).json({message:'Invalid Username or Password'});
});

app.post('/admin/courses', authenticateJwt , async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({message: 'Course Created Successfully' , courseId : course.id});
});

app.put('/admin/courses/:courseId', authenticateJwt , async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new: true});
  if(course) res.json({message: 'Course Updated Successfully'});
  else res.status(404).json({message: 'Course Not Found'});
});

app.get('/admin/courses', authenticateJwt , async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses});
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const {username , password} = req.body;
  const user = await User.findOne({username});
  if(user) res.status(403).json({message: 'User Already Exist'});
  else {
    const newUser = new User({username , password});
    await newUser.save();
    const token = jwt.sign({username , role:'user'} , secret , {expiresIn: '1h'});
    res.json({message: 'User Created Successfully' , token});
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const {username , password} = req.headers;
  const user = await User.findOne({username , password});
  if(user) {
    const token = jwt.sign({username , role:'user'} , secret , {expiresIn: '1h'});
    res.json({message: 'Logged In Successfully' , token});
  }
  else res.json({message: 'Invalid Username or Password'});
});

app.get('/users/courses',authenticateJwt , async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published: true});
  res.json({courses});
});

app.post('/users/courses/:courseId', authenticateJwt , async (req, res) => {
  // logic to purchase a course
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

app.get('/users/purchasedCourses', authenticateJwt , async (req, res) => {
  // logic to view purchased courses
  const user =  await User.findOne({username: req.user.username}).populate('purchasedCourses');
  if(user) res.json({purchasedCourses: user.purchasedCourses || []});
  else res.status(403).json({message:'User Not Found'});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});