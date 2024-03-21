const mongoose = require('mongoose')

/**
 * Models
 */
const Series = require('../models/series')

/**
 * Repositories
 */
const SerieRepository = require('./serieRepository')

const serieRepository = new SerieRepository({ Series })

describe('Serie Repository', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb')
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await Series.deleteMany()
  })

  it('should create a new serie', async () => {
    const data = {
      name:     'The Office',
      status:   'watched',
      imageURL: 'https://unittest.test/theoffice.png',
      author:   '65fa423dc65c2600f728e3c7'
    }

    const serie = await serieRepository.save(data)

    expect(serie).toHaveProperty('name', 'The Office')
  })

  it('should return error if some field is empty - create serie', async () => {
    const data = {
      name:     'The Office',
      status:   'watched',
      imageURL: 'https://unittest.test/theoffice.png'
    }

    try {
      await serieRepository.save(data)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it('should return all series by user', async () => {
    const serie = await serieRepository.all('65fa423dc65c2600f728e3c7')

    expect(serie).toHaveLength(0)
  })

  it('should return a serie by user', async () => {
    const serie = await serieRepository.find('65fa4878048aad0f14a5cc3c', '65fa423dc65c2600f728e3c7')

    expect(serie).toBeNull()
  })

  it('should update serie by user', async () => {
    const data = {
      serieID:  '65fa4878048aad0f14a5cc3c',
      userID:   '65fa423dc65c2600f728e3c7',
      name:     'The Office',
      status:   'watched',
      imageURL: 'https://unittest.test/theoffice.png',
    }

    const serie = await serieRepository.updateSerie(data)

    expect(serie).toBeNull()
  })
  
  it('should remove serie by id and user id', async () => {
    const data = {
      serieID: "65fa4878048aad0f14a5cc3c",
      userID:  "65fa423dc65c2600f728e3c7"
    }

    const serie = await serieRepository.removeSerie(data)

    expect(serie).toBeNull()
  })

  it('should add a new comment by serie id and user id', async () => {
    const data = {
      serieID: "65fa4878048aad0f14a5cc3c",
      userID:  "65fa423dc65c2600f728e3c7",
      comment: "The best serie of the world!"
    }

    const serie = await serieRepository.addComments(data)

    expect(serie).toBeNull()
  })

  it ('should return error if some field is empty - add comment', async () => {
    try {
      const data = {
        serieID: "65fa4878048aad0f14a5cc3c",
        userID:  "65fa423dc65c2600f728e3c7"
      }
  
      await serieRepository.updateComment(data)

    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it ('should remove comment by comment id, serie id and user id', async () => {
    const data = {
      serieID:   "65fa4878048aad0f14a5cc3c",
      userID:    "65fa423dc65c2600f728e3c7",
      commentID: "65fb926c5fcde8c5f66ed514"
    }

    const serie = await serieRepository.removeComment(data)

    expect(serie).toBeNull()
  })
})