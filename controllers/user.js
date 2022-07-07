const { User, Role } = require('../models/user');
const { format } = require("date-fns-tz");
const bcrypt = require('bcryptjs');
module.exports.saveUser = async (req,res) => {
    console.log(req.body);
    try {
        const { name, role, email  } = req.body;
        const {userId} = req;
        const user = await User.create({
            fullname: name,
            email: email,
            roleId: role,
            status: 'pending',
            password: bcrypt.hashSync('123456', 16)
        });
        if (!user) return res.status(401).send({message: 'fail to save'});
        let date= new Date(user.createdAt.getUTCFullYear(), user.createdAt.getUTCMonth(), user.createdAt.getUTCDate());
        date = format(date, 'dd-MM-yyyy');
        const log ={
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            createdAt: date,
            status: user.status,
            roleId: user.roleId
        }
        // console.log('log.createdAt.toString() :>> ', log.createdAt.toString().split(' ')[0]);
        return res.status(201).send({message: 'save successfully', log});
    } catch (error) {
        console.log('error.errors :>> ', error.errors[0].message);
        return res.status(500).send({message: error.errors[0].message && 'server error'});
    }
}
module.exports.fecthUser = async (req,res) => {
    console.log(req.body);
    try {
        let log = await User.findAll({
            attributes: {exclude: ['password']}
        });
        if (!log) return res.status(401).send({message: 'fail to save'});
        for( let i =0 ;i< log.length;i++){
            let date= new Date(log[i].createdAt.getUTCFullYear(), log[i].createdAt.getUTCMonth(), log[i].createdAt.getUTCDate());
            date = format(date, 'dd-MM-yyyy');
            log[i].createdAt = date;
        }
        return res.status(201).send({log});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'server error'});
    }
}