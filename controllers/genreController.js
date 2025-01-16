const {Genre}= require('../models');
class Controller{
static async showGenres(req,res,next){
    try {
        let data= await Genre.findAll()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
static async genreDelete(req,res,next){
    try {
        const{id}= req.params
        let data= await Genre.destroy({where:{id:id}})
        if(!data)throw({name: "genre not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

static async editGenre(req,res,next){
    try {
        const {id}=req.params
        const {name}= req.body
        let data= await Genre.update({name},{where:{id:id}})
        if(!data)throw({name: "genre not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

static async showGenreDetail(req,res,next){
    try {
        const {id}= req.params
        let data= await Genre.findOne({where:{id:id}})
        if(!data)throw({name: "genre not found"})
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}

static async addGenre(req,res,next){
    try {
        const {name}= req.body
        let data= await Genre.create({name})
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

}

module.exports= Controller