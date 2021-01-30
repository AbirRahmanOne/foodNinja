const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login authentication check and redirect
const requireAuth = (req, res, next) => {
    //Get the token from cookie storage
    const token = req.cookies.jwt;
    console.log(token);

    // Check json web token exists and is verified
    if(token) {
        // Verify the token
        // Pass the secret key used in authController.createToken()
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.send(user)
            }
            else {
                console.log(decodedToken);
                // Go to the next route in app.js
                next();
            }
        })
    }
    else {
        res.send('Not Exit Token')
    }
}

// Check current user
const checkUser = (req, res, next) => {
    //Get the token from cookie storage
    const token = req.cookies.jwt;

    if(token) {
        // Verify the token
        // Pass the secret key used in authController.createToken()
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                // user does not exist
                // so set null to local variable to show in views
                res.locals.user = user;
                //move on to next handler
                next();
            }
            else {
                //if user is logged in
                console.log(decodedToken);

                let user = await User.findById(decodedToken.id);
                // create a local variable in the view
                // this var will be available in the view to use
                res.locals.user = user;
                // Go to the next route in app.js
                next();
            }
        })
    }
    else {
        // token does not exist, so user also does not exist
        // so set null to local variable to show in views
        res.locals.user = null;
        //move on to next handler
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
};