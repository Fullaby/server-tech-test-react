const bcrypt = require('bcryptjs');

let hashPassword= (password)=> bcrypt.hashSync(password,10)
let comparePassword= (password,passHashed)=> bcrypt.compareSync(password,passHashed)

module.exports= {hashPassword,comparePassword}