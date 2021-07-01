
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const path = require('path')
const errorHandler = require("./middleware/error");
const AssignmentRoutes = require('./routes/AssignmentRoutes')


connectDB()

const app = express();

app.use(express.json())

app.use(cookieParser())
app.use(cors())
//routes
app.use('/user', require('./routes/userRouter'))
app.use('/assignment',AssignmentRoutes)

//use error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));