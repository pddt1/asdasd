const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/auth');
const jwt = require('jsonwebtoken');


module.exports.signin = async (req,res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({
            where:{
                email: req.body.email
            },
        });
        if(!user) return res.status(401).send({message: 'fail to login'});
        console.log('before: ', new Date());
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        console.log('after: ', new Date());

        if(!passwordIsValid) return res.status(401).send({message: 'fail to login'});

        const token = jwt.sign({ id:user.id }, config.secret, {
            expiresIn: '1d' //24h
        });
        res.status(200).send({
            id: user.id,
            email: user.email,
            fullanme: user.fullanme,
            roleId: user.roleId,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken: token
        });
    } catch (error) {
        console.error(error);
        return res.status('500').send({message: 'server error'});
    }
};

module.exports.checkSession = async (req,res) => {
    let token = req.headers['x-access-token'];
    const {userId} = req;

    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        if(!user) return res.status(404).send({message: 'session fail'});
        res.status(200).send({
            id:user.id,
            email: user.email,
            fullanme: user.fullanme,
            roleId: user.roleId,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken: token
        });

    } catch (error) {
        console.log(error)
        return res.status('500').send({message: 'server error'});
    }
}