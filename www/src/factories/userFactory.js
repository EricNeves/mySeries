const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

/**
 * Services
 */
const UserService = require('../services/userService')

/**
 * Repository
 */
const UserRepository = require('../repositories/userRepository')

/**
 * Models
 */
const Users = require('../models/users')

/**
 * Instances
 */
function generateInstance() {
  const userRepository = new UserRepository({ Users })

  const dependencies = {
    userRepository,
    jwt,
    SECRET_KEY
  }

  const userService = new UserService(dependencies)

  return userService
}

module.exports = {
  generateInstance
}

