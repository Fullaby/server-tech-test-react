const {User}= require('../models');
const {verifyToken}= require('../helpers/jwtHelper');
const Authentication=  async (req,res,next)=>{
    try {
        const {access_token}=req.headers
        let payload= verifyToken(access_token)
        const user= await User.findByPk(payload.id)

        if(!access_token)throw({name: 'No Token'})
        if(!user)throw({name: 'Unauthorized'})

        req.user={
            id: user.id,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }

}

module.exports= Authentication