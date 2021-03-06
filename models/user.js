const { strict } = require('assert');
const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

// creating user DB
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'pass is required'],
    
    },

    address:{
        type: String,
        required:[true, 'Address fields is required']
    },
})

// check if the user entered password matches
// with the one in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

// Fire a function After new data saved to DB 
userSchema.post('save', (data, next)=>{
    console.log('New user created and saved', data);
    next() ; // do this and go to next event
})


//Fire a function BEFORE doc saved to DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    //this has user object contains user email and password
    this.password = await bcrypt.hash(this.password, salt); //password is edited with hash
    next(); //do this and go to next event
});

const User = mongoose.model('user', userSchema);

module.exports = User;