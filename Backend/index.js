const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const adminCoursesRouter = require('./routes/courseAdmin');
const userCoursesRouter = require('./routes/courseUser');
const landingRouter = require('./routes/landing');

dotenv.config();
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
mongoose.connect(process.env.DB_URL , 
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
