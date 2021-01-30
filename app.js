const express = require('express');
const mongoose = require('mongoose') ;
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const cookieparser = require('cookie-parser');
const {
    requireAuth,
    checkUser,
} = require('./middlewares/authMiddleware');



require('dotenv').config()


let port = process.env.PORT ;

const app = express() ;
//Connect to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then((result => {
    console.log("Database Connected");
    
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/api/user', userRoute);

    // Check if user is logged in before going to any routes
    app.get("*", checkUser);

/*

    //Middleware and static files
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    //cookieparser can access a cookie method in response object
    app.use(cookieparser());
*/


    app.listen(port,async ()=>{
        console.log("Started listening on port: 3000");
    })
}))
.catch((err) => {
    console.log(`Database connection error: ${err}`);
});
