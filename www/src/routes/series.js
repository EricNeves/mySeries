const router = require('express').Router()

/**
 * Controllers
 */
const serieController = require('../controllers/serieController')

/**
 * Factories
 */
const serieFactory = require('../factories/serieFactory')

/**
 * Services
 */
const serieService = serieFactory.generateInstance()

/**
 * Middlewares
 */
const authenticateJWT = require('../middlewares/authenticateJWT')

/**
 * Routes
 */
router.post('/',      authenticateJWT, serieController.store.bind({},       { serieService }))
router.get('/',       authenticateJWT, serieController.series.bind({},      { serieService }))
router.get('/:id',    authenticateJWT, serieController.get.bind({},         { serieService }))
router.put('/:id',    authenticateJWT, serieController.changeSerie.bind({}, { serieService }))
router.delete('/:id', authenticateJWT, serieController.removeSerie.bind({}, { serieService }))

router.post('/comments/:id',               authenticateJWT, serieController.storeComment.bind({},  { serieService }))
router.put('/:serie/comments/:comment',    authenticateJWT, serieController.changeComment.bind({}, { serieService }))
router.delete('/:serie/comments/:comment', authenticateJWT, serieController.removeComment.bind({}, { serieService }))

module.exports = router