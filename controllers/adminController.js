const {comparePassword} = require('../helpers/bcryptHelper');
const { createToken } = require('../helpers/jwtHelper');
const{ User } =require('../models');
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");

class Controller{

    static async changePassword(req, res, next){
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // Assuming `req.user` is populated from authentication middleware.

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify old password
        const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
};

static async login(req,res,next){
    try {
        const{ email , password } = req.body
        const data= await User.findOne({where:{email:email}})
        let checkPass= comparePassword(password,data.password)

        if(!email||!password)throw({name: "Invalid Email/Password"})
        if(!checkPass)throw({name: "Invalid Email/Password"})
        if(!data)throw({name: "Invalid Email/Password"})
        const payload= {id: data.id}
        const token = createToken(payload)
        res.status(200).json({
            access_token: token,
            name: data.username
        })
        
    } catch (error) {
        next(error)
    }
}
static async register (req,res,next){
try {
    const {username,email,password,phoneNumber,address}= req.body
    let data= await User.create({username,email,password,phoneNumber,address,role: 'Admin'})
    res.status(201).json({
        id: data.id,
        email: data.email
    })
} catch (error) {
    next(error)
}
}

static async googleSignIn(req, res, next) {
    try {
        const { token_google } = req.headers;

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token_google,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(payload,"ALALAL");
        
        const [user, created] = await User.findOrCreate({
            where: {
                email: payload.email,
                username: payload.email.split("@")[0],
            },
            defaults: {
                username: payload.email.split("@")[0],
                email: payload.email,
                password: "password_google",
                phoneNumber: "123",
                address: "123",
                role: "admin"
            },
            hooks: false,
        });

        const token = createToken({
            username: user.username,
            email: user.email,
            id: user.id,
            role: user.role,
        });
        res.status(200).json({
            login: Boolean(user),
            access_token: token,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        next(error);
        console.log(error);
        
    }
}
}

module.exports= Controller