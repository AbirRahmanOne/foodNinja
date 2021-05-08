const jwt = require('jsonwebtoken');

const createToken = (data) =>{
    
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h'}) ;
    return token ;
};

module.exports = createToken;
