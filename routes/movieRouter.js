const router = require('express').Router();
const Controller = require('../controllers/movieController');

router.get('/', Controller.showMovie)
router.post('/', Controller.createMovie)
router.delete('/:id',Controller.deleteMovie)
router.get('/:id', Controller.showDetail)
router.put('/:id',Controller.editMovie)

module.exports= router