const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const { User, Role } = require('../models/user');
const db = require('../models');

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
        // const role = await Role.findOne({
        //     where: {
        //         id: user.roleId
        //     },
        //     attributes: ['name']
        // });
        if(user.roleId !== 2) {
            res.status('403').send({message: 'access denied'});
            return;
        }
        next();
    } catch (error) {
        res.status('500').send();
        return;
    }    
}
