/**
 * Services
 */
const SerieService = require('../services/serieService')

/**
 * Repository
 */
const SerieRepository = require('../repositories/serieRepository')

/**
 * Models
 */
const Series = require('../models/series')

/**
 * Instances
 */
function generateInstance() {
  const serieRepository = new SerieRepository({ Series })

  const dependencies = {
    serieRepository
  }

  const serieService = new SerieService(dependencies)

  return serieService
}

module.exports = {
  generateInstance
}

