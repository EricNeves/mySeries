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
 * Utils
 */
const bcrypt  = require('../utils/bcrypt')

/**
 * Instances
 */
function generateInstance() {
  const userRepository = new UserRepository({ Users, bcrypt })

  const dependencies = {
    userRepository,
    jwt,
    SECRET_KEY,
    bcrypt
  }

  const userService = new UserService(dependencies)

  return userService
}

module.exports = {
  generateInstance
}

