const jwt= require('jsonwebtoken');
const secret= process.env.SECRET

let createToken= (payload)=> jwt.sign(payload,secret)
let verifyToken= (token)=> jwt.verify(token,secret)

module.exports= {createToken,verifyToken}