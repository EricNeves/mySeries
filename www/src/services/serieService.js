class SerieService {
  constructor({ serieRepository, jwt, SECRET_KEY, jwtUtil }) {
    this.serieRepository = serieRepository
    this.jwt             = jwt 
    this.SECRET_KEY      = SECRET_KEY
    this.jwtUtil         = jwtUtil
  }

  async create(data) {
    try {
      const serie = await this.serieRepository.save(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async fetch(userID) {
    try {
      const serie = await this.serieRepository.all(userID)

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async fetchByID({ serieID, userID }) {
    try {
      const serie = await this.serieRepository.find({ serieID, userID })

      if (!serie) return { error: 'Sorry, serie not found.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async updateSerie(data) {
    try {
      const serie = await this.serieRepository.updateSerie(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async deleteSerie(data) {
    try {
      const serie = await this.serieRepository.removeSerie(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async createComment(data) {
    try {
      const serie = await this.serieRepository.addComments(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async updateComment(data) {
    try {
      const serie = await this.serieRepository.updateComment(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }

  async deleteComment(data) {
    try {
      const serie = await this.serieRepository.removeComment(data)

      if (!serie) return { error: 'Sorry, something went wrong.' }

      return serie

    } catch (err) {
      return { error: err.message }
    }
  }
}

module.exports = SerieService