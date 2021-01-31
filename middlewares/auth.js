const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) =>{
    if( req.headers.authorization){

        const token = req.headers.authorization.split(" ")[1] ;
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user ;
    }else{
        return res.status(400).json({
            message: "Required Authorization" 
        })
    }next();
};

module.exports = requireLogin ;