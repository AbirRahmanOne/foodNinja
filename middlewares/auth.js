const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  const token = req.headers['authorization'];
    if (!token) {
        return res.status(403)
            .json({
                Error: 'Token Not Found'
            });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403)
                    .json({
                        Error: 'Token does not match'
                    });
            } else {
                req.userData = {
                    _id: decoded._id,
                    name: decoded.name,
                    email: decoded.email
                }
                next(); // go to next function
            }
        });
    }
};
