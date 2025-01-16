
const {Movie, Cast,Genre} =require('../models');

class Controller{

static async showPublicGenre(req,res,next){
    try {
        let data= await Genre.findAll()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

static async showPublicMovie(req,res,next){
    try {
        let data= await Movie.findAll()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

static async showPublicDetail(req,res,next){
    try {
        const {id}= req.params
        let data= await Movie.findOne({where:{id:id},include: [{model: Cast},{model: Genre}]})
        if(!data)throw({name: "movie not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

}

module.exports= Controller