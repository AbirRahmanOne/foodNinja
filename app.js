const express = require('express');
const mongoose = require('mongoose') ;
const morgan = require('morgan');
const connectDB = require('./config/db') ;
const dotenv = require('dotenv');

// import routes
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/order')
const itemRoute = require('./routes/item')
const app = express();

dotenv.config()

let port = process.env.PORT ;
if( port==null || port==''){
  port = 8000 ;
}

// connect to database
connectDB() ;

//body parser
app.use(express.json());


// routes
app.use("/api", userRoutes);
//app.use("/api", itemRoute) ;
//app.use("/api", menuRoutes);
//app.use("/api", orderRoutes);

app.get('/', (req,res)=>{
  res.send('Welcome to FoodNinja Api Endpoints');
})

app.listen(port, async() => {
    console.log(`FoodNinja Application is running at# ${port}`);
  });
