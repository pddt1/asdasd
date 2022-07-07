const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const { User, Role } = require('../models/user');
const db = require('../models');
const TEACHER_ROLE = 1;
const COURSE_MANAGER_ROLE = 2;
const ASSISTANT_ROLE = 3;

module.exports.verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({message: 'token not provided'});
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) =>{
        if (err) {
            res.status(401).send({message: 'token fail'});
            return;
        }
        req.userId = decoded.id;
        console.log('req.userId :>> ', req.userId);
        next();
    });
}

module.exports.verifyRole = async (req,res,next) => {
    const {userId} = req;
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
  
        if(user.roleId !== COURSE_MANAGER_ROLE) {
            res.status('403').send({message: 'access denied'});
            return;
        }
        next();
    } catch (error) {
        res.status('500').send();
        return;
    }    
}

module.exports.verifyField = (req,res,next) => {
    const { name, role, email  } = req.body;
    if (name === '' || role === '' || email === '') {
        res.status('400').send({message: 'Input field cannot be none'});
        return;
    }
    next();
}
