const { User } = require('../models/user');
const { format } = require("date-fns-tz");

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
            password: '123456'
        });
        if (!user) return res.status(401).send({message: 'fail to save'});
        // log.createdAt = log.createdAt.split(' ')[0];
        let date =""
        for(let i=1;i<4;i++){
            date+=user.createdAt.toString().split(' ')[i]+" "
        }
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
        console.error(error);
        return res.status(500).send({message: 'server error'});
    }
}
module.exports.fecthUser = async (req,res) => {
    console.log(req.body);
    try {
        const log = await User.findAll({
            attributes: {exclude: ['password']}
        });
        console.log('log', log)
        if (!log) return res.status(401).send({message: 'fail to save'});
        return res.status(201).send({log});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'server error'});
    }
}