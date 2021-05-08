const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const createToken = require('../utils/createToken');
const { options } = require('../routes/user');



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

//update user method
const updateUser = async (req, res)=>{
    try {
        const filter = { _id: req.params.id } ; 
        const updatedData = {} ;

        if( req.body.name ) updatedData.name = req.body.name ;
        if( req.body.email ) updatedData.email = req.body.email ;
        if( req.body.address ) updatedData.address = req.body.address ;
        if( req.body.password){
            const salt = await bcrypt.genSalt() ;
            updatedData.password = await bcrypt.hash(req.body.password, salt) ;
        }

        const options = { new: true, upsert: false } ; 
        const result = await User.findByIdAndUpdate(filter, updatedData, options);

        res.status(201).json({
            newData: result,
            message: `User updated successfully`
                
        });
        
    } catch (err) {
        res.status(501).json({
            errors: `Server Side errors.`
        });
    }
}

// delete method
const deleteUser = async (req, res)=>{

    try {
        const filter = { _id: req.params.id } ; 
        const result = await User.findByIdAndDelete(filter) ;

        if(result){
            res.status(201).json({
                message: 'User Deleted Successfully!'
            });
        }else{
            res.status(501).json({
                message: 'Already Deleted!'
            });
        }
 
    } catch (err) {
        res.status(500).json({
            error: `There was a server side errors!`,
        });
    }

}

module.exports = {
    signup,
    login,
    logout,
    getUsers,
    updateUser,
    deleteUser,
    
}