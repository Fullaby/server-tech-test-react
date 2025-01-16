const router = require('express').Router();
const Controller= require('../controllers/adminController');

router.post('/login', Controller.login)
router.post("/google", Controller.googleSignIn);
router.post('/', Controller.register)


module.exports= router