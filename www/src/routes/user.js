const router = require('express').Router()

/**
 * Controllers
 */
const userController = require('../controllers/userController')

/**
 * Factories
 */
const userFactory = require('../factories/userFactory')

/**
 * Services
 */
const userService = userFactory.generateInstance()

/**
 * Middlewares
 */
const authenticateJWT = require('../middlewares/authenticateJWT')

/**
 * Routes
 */
router.post('/',      userController.store.bind({}, { userService }))
router.post('/login', userController.login.bind({}, { userService }))
router.get('/',       authenticateJWT, userController.user.bind({},  { userService }))

module.exports = router 