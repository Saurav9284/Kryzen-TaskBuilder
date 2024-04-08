const {JWT_SECERT} = require('../Config/db')
const jwt = require('jsonwebtoken')

const authorization = (req,res,next) => {
    
    if(!req.headers.authorization){
        return res.send({msg:'Login first'})
    }
    const token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, JWT_SECERT, (err, decoded) => {
        if (err) {
            return res.send({ msg: 'Please login first!' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = authorization