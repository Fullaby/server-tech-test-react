const {Movie}= require('../models');

let Authorization= async(req,res,next)=>{
    try {
        const {id}= req.params
        let movie= Movie.findByPk(id)

        if(movie.authorId=== req.user.id){
            next()
        }else{
            throw({name: 'Forbidden'})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = Authorization