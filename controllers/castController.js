const {Cast} = require('../models');

class Controller{
static async showCast(req,res,next){
    try {
        let data = await Cast.findAll()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
}

module.exports= Controller