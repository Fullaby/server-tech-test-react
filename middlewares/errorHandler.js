const errorHandler = async (error,req,res,next)=>{
    console.log(error);
    if(error.name== 'SequelizeValidationError' || error.name== 'SequelizeUniqueConstraintError'){
        res.status(400).json({
            message: error.errors[0].message
        })
    }else if(error.name== 'Unauthorized' || error.name== 'JsonWebTokenError'){
        res.status(401).json({
            message: "Invalid Token"
        })
    }else if(error.name== 'No Token'){
        res.status(401).json({
            message: "Invalid Token"
        })
    }else if(error.name== 'Invalid Email/Password'){
        res.status(401).json({
            message: "Invalid Email/Password"
        })
    }else if(error.name== 'TypeError'){
        res.status(401).json({
            message: "Invalid Email/Password"
        })
    }else if(error.name== 'movie not found'){
        res.status(404).json({
            message: "Movie not found"
        })
    }else if(error.name== 'genre not found'){
        res.status(404).json({
            message: "Genre not found"
        })
    }else{
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }

}


module.exports= errorHandler