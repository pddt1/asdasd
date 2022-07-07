const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const { User, Role } = require('../models/user');
const db = require('../models');

module.exports.verifyField = (req,res,next) => {
    const { name, role, email  } = req.body;
    if (name === '' || role === '' || email === '') {
        res.status('400').send({message: 'Input field cannot be none'});
        return;
    }
    next();
}