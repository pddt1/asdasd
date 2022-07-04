const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/auth');
const jwt = require('jsonwebtoken');
// module.exports.signup = async (req,res) => {
//     try {
//         console.log(req)
//         const user = await User.create({
//             email: req.body.email,
//             email: req.body.email,
//             password: bcrypt.hashSync(req.body.password, 8)
//         });
//         if(user) return res.status(201).send({message: 'register successfully'});
//     } catch (error) {
//         console.error(error);
//         return res.status('500').send({message: 'server error'});
//     }
// };

module.exports.signin = async (req,res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        if(!user) return res.status(404).send({message: 'fail to login'});
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid) return res.status(401).send({message: 'fail to login'});

        const token = jwt.sign({ id:user.id }, config.secret, {
            expiresIn: 86400 //24h
        });
        res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token
        });
    } catch (error) {
        console.error(error);
        return res.status('500').send({message: 'server error'});
    }
};

module.exports.checkSession = async (req,res) => {
    const {userId} = req;
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        if(!user) return res.status(404).send({message: 'session fail'});
        res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token
        });

    } catch (error) {
        return res.status('500').send({message: 'server error'});
    }
}