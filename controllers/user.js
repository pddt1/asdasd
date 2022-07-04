const { Log } = require('../models/user');
const { format } = require("date-fns-tz");

module.exports.saveLog = async (req,res) => {
    console.log(req.body);
    try {
        const { data } = req.body;
        const {userId} = req;
        const today = new Date();
        const currentDate = format(today, 'yyyy-MM-dd hh:mm:ss');
        const log = await Log.create({
            userId: userId,
            data: data,
            date: currentDate
        });
        if (!log) return res.status(401).send({message: 'fail to log'});
        return res.status(201).send({message: 'log successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'server error'});
    }
}
