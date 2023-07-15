const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const adminCoursesRouter = require('./routes/courseAdmin');
const userCoursesRouter = require('./routes/courseUser');
const landingRouter = require('./routes/landing');

const app = express();
app.use(bodyParser.json());

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(express.json());


app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/admin/courses' , adminCoursesRouter);
app.use('/admin/courses' , userCoursesRouter);
app.use('/' , landingRouter);

//MongoDB Connection
mongoose.connect('mongodb+srv://mankaransingh39:admin@cluster0.ges4flm.mongodb.net/courses' , 
  {
    dbName: 'courses',
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log("Database Connected");
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});