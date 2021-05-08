const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next )=>{
    const { authorization } = req.headers ;
    const token = authorization.split(' ')[1] ;

    if( typeof token === 'undefined'){
        res.status(403).json({ message: `not logging in` });
        return ;
    }
    
    try {
        const payload = await jwt.verify(token, process.env.SECRET_KEY) ;
        if(!payload){
            res.status(403).json({
                message: `Unauthorized, Please login first`
            });
        }else{
            // next middlewares 
            req.userData =  payload ;
            next() ;
        }
        
    } catch (error) {
        res.status(401).json({
            message: `Unauthorized, invalid token`
        });
    }
} 

module.exports = {
    authenticate
}