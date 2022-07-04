const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const { User } = require('../models/user');

module.exports.verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.status('403').send({message: 'token not provided'});
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) =>{
        if (err) {
            res.status(401).send({message: 'token fail'});
            return;
        }
        req.userId = decoded.id;
        next();
    });
}