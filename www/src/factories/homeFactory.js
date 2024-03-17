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
  const homeService    = new HomeService(homeRepository)

  return homeService
}

module.exports = {
  generateInstance
}