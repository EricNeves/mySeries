/**
 * Services
 */
const HomeService = require('../services/homeService')

/**
 * Repositories
 */
const HomeRepository = require('../repositories/homeRepository')

/**
 * Instances
 */
function generateInstance() {
  const homeRepository = new HomeRepository()

  const dependencies = {
    homeRepository
  }

  const homeService = new HomeService(dependencies)

  return homeService
}

module.exports = {
  generateInstance
}