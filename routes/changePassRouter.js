const router = require('express').Router();
const Controller= require('../controllers/adminController');

router.put("/change-password", Controller.changePassword);


module.exports= router