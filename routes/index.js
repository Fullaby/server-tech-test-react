const router = require('express').Router();
const Authentication = require('../middlewares/authentication');
const adminRouter = require('./adminRouter');
const changePassRouter = require('./changePassRouter');
const genreRouter= require('./genreRouter');
const movieRouter= require('./movieRouter');
const castRouter= require('./castRouter');
const publicRouter= require('./publicRouter');

router.use('/public',publicRouter)
router.use('/users',adminRouter)
router.use(Authentication)
router.use('/users',changePassRouter)
router.use('/genres',genreRouter)
router.use('/movies',movieRouter)
router.use('/casts',castRouter)

module.exports= router