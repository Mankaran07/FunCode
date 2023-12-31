const mongoose = require('mongoose');


//User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});
  

//Admin Schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});


//Course Schema  
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: {
        type: Boolean,
        default: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
});
  
const User = mongoose.model('User' , userSchema);
const Admin = mongoose.model('Admin' , adminSchema);
const Course = mongoose.model('Course' , courseSchema);

module.exports = {
    User,
    Admin,
    Course
}
