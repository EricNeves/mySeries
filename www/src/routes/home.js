const router = require('express').Router()

/**
 * Controllers
 */
const homeController = require('../controllers/homeController')

/**
 * Factories
 */
const homeFactory = require('../factories/homeFactory')

/**
 * Services
 */
const homeService = homeFactory.generateInstance()

/**
 * Routes
 */
router.get('/', homeController.index.bind({}, { homeService }))

module.exports = router 