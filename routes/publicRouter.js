const router = require('express').Router();
const Controller = require('../controllers/publicController');

router.get('/movies', Controller.showPublicMovie)
router.get('/genres', Controller.showPublicGenre)
router.get('/movies/:id', Controller.showPublicDetail)

module.exports= router