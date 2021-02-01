const express = require('express');
const mongoose = require('mongoose') ;
const morgan = require('morgan');
const connectDB = require('./config/db') ;

// import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/order')
const app = express();

require('dotenv').config()

let port = process.env.PORT ;

console.log(port);
// connect to database
connectDB() ;

//body parser
app.use(express.json());


// routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);



app.listen(port, async() => {
    console.log("App is running at : " + port);
  });
