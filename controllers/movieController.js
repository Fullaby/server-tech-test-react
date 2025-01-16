const{Movie,Genre,Cast, sequelize}= require('../models');

class Controller{
static async showMovie(req,res,next){
try {
    let data= await Movie.findAll({include: {model:Genre}})
    res.status(200).json(data)
} catch (error) {
    next(error)
}
}
static async showDetail(req,res,next){
    try {
        const {id}= req.params
        let data= await Movie.findOne({where:{id:id},include: [{model: Genre},{model:Cast}]})
        if(!data)throw({name: "movie not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

static async editMovie(req,res,next){
    try {
        const {id}= req.params
        const {title,synopsis,trailerUrl,imgUrl,rating,genreId} = req.body
        let data= await Movie.update({title,synopsis,trailerUrl,imgUrl,rating,genreId},{where:{id:id}})
        if(!data)throw({name: "movie not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
        
    }
}

static async createMovie(req,res,next){
    let t = await sequelize.transaction()
    try {
        const {title,synopsis,trailerUrl,imgUrl,rating,genreId,profilePict,name}= req.body
        let data= await Movie.create({title,synopsis,trailerUrl,imgUrl,rating,genreId,authorId: req.user.id,slug: `${title.split(' ').join('-')}`},{transaction: t})
        await Cast.create({name,profilePict,movieId: data.id},{transaction: t})
        if(typeof name !== "string"){
            let result= []
            for(let i = 0 ; i < name.length; i++){
                let element= { movieId : data.id}
                element.name= name[i]
                element.profilePict= profilePict[i]
                // console.log(element);
                result.push(element)
            }
            await Cast.bulkCreate(result, {transaction: t})
        }else{
            await Cast.bulkCreate({name,profilePict,movieId: data.id}, {transaction: t})
        }
        await t.commit()
        res.status(201).json(data)
    } catch (error) {
      await t.rollback()
        next(error)
    }
}

static async deleteMovie(req,res,next){
    try {
        const{id}=req.params
        let data= await Movie.destroy({where:{id:id}})
        if(!data)throw({name: "movie not found"})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
}

module.exports= Controller