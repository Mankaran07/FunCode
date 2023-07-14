const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(express.json());


app.use('/admin', adminRouter);
app.use('/users', userRouter);


//MongoDB Connection
mongoose.connect('mongodb+srv://mankaransingh39:admin@cluster0.ges4flm.mongodb.net/courses' , {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});