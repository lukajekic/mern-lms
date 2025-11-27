const express = require('express');
const app = express();
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./utils/db')
app.use(cors({
    origin: "https://lms-backend-lukajekic.netlify.app",
    credentials: true
}));
const CookieParser = require('cookie-parser')
app.use(CookieParser())

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const CourseRoute = require('./routes/Routes');
const bodyParser = require('body-parser');

app.use('/api', CourseRoute)

app.listen(5000, () => console.log('✅ Server running on port 5000'));
