const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;




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

const user_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = await User.findOne({ email }); 
        console.log(userId);
        // TDOD: check password
        // Do login
        const user = await User.login(email, password);
        res.status(200).json({
            status: "Login Success",
            user: user._id
        });
        
    } catch (err) {
        console.log(err);
        res.status(500)
        res.json({ errors: err });
    }
}

const user_create = async(req,res) => {
    try{
        const { name, password, email, address } = req.body;
        const user =  new User({name, pass, email, address}).save() ;
       
       
        res.status(200);
        res.json({data: user});
    } catch(err){
        res.status(500)
        res.json({ errors: err });
    }
}

module.exports = {
    user_details,
    user_create,
    user_login,
    
}