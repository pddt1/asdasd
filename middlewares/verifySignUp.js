const { User } = require('../models/user');

module.exports.checkUsername = async (req, res, next) => {
    try {
        const {username, email} = req.body;
        const user = await User.findOne({
            where:{
                username: username
            }
        });
        if(user){
            res.status(400).send({message: 'user exist'});
            return;
        }
        next();
    } catch (error) {
        res.status(500).send({message: 'server error'});
            return;
        
    }
}

