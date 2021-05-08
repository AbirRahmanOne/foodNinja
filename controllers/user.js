const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const createToken = require('../utils/createToken')



// create new user method 
const signup = async (req,res) => {
    try{
        const user = new User(req.body);
        user.save() ;       
        res.status(201).json({
            message: 'User Created Successfully!',
        });
    } catch(err){
        res.status(500).json({
            error: `Server side errors.`
        });
    }
}

// login methods 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne( {email} ); 

        const isValid = await user.matchPassword(password) ;
        const payload = {
            id: user._id,
            email: user.email,
        }

        if ( user && isValid ){
            res.cookie('jwt_token', createToken(payload), {expiresIn: '1d'});
            res.json({
                token: createToken(payload),
                message: `Login successful`
            });      
        }
        else{
            res.status(401).json({
                "error": `Authetication failed!`
            });
        }
        
    } catch (err) {
        res.status(401).json({
            "error": `Authentication failed!`
        })
    }
}


const logout = (req, res) =>{
    res.clearCookie("jwt_token");
    res.status(200).json({
        message: "logout Successfully"
    });
}


// show all register user 
const getUsers = async (req,res)=>{
    try {
        const data = await User.find().select({
            //_id: 0,
            __v:0,
            password:0
        }).limit(5) ;

        res.status(501).json({
            users: data,
            message: 'All register users.[Limit 5]'
        });
    } catch (err) {
        res.status(403).json({
            errors: `Server side errors!`
        });
    }
}

module.exports = {
    getUsers,
    signup,
    login,
    logout,
    
}