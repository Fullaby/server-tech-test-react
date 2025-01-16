const router = require('express').Router();
const Controller= require('../controllers/genreController');

router.get('/', Controller.showGenres)
router.post('/', Controller.addGenre)
router.delete('/:id', Controller.genreDelete)
router.put('/:id' , Controller.editGenre)
router.get('/:id', Controller.showGenreDetail)

module.exports= router