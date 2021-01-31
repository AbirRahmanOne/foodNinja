const express = require('express');
const mongoose = require('mongoose') ;
const morgan = require('morgan');
const connectDB = require('./config/db') ;
const userRoute = require('./routes/userRoute');
const app = express();

require('dotenv').config()

let port = process.env.PORT ;

console.log(port);
// connect to database
connectDB() ;

//body parser
app.use(express.json());


// routes
app.use("/api", userRoute);



app.listen(port, async() => {
    console.log("App is running at : " + port);
  });
