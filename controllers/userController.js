const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')



// show all register user 
// deleted **
const user_details = (req,res)=>{
    User.find().sort({createdAt: -1})
    .then((data)=>{
        res.status(200);
        res.json(data);
    })
    .catch((err) => {
        res.status(404).send(err);
    })
}

// create new user funtion 
const register = async(req,res) => {
    try{
        const { name, password, email, address } = req.body;
        const user =  new User({name, password, email, address}).save() ;
       
       
        res.status(201).json({
            message: 'User Created Successfully',
        });
    } catch(err){
        res.status(500)
        res.json({ errors: err });
    }
}

// login function 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); 

        if(!user) return res.json({
            message: "User Not Found!" 
        });

        console.log(user);
        // TDOD: check password
        // Do login

        if ( user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });

            
        }
        else{
            res.status(401).json({
                message: "Invalid login credentials",
            })
        }
        
    } catch (err) {
        console.log(err);
        res.status(500)
        res.json({ errors: err });
    }
}


const logout = (req, res) =>{
    res.clearCookie("token");
    res.status(200).json({
        message: "logout Successfully"
    })
}

module.exports = {
    user_details,
    register,
    login,
    logout,
    
}