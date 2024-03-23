const SerieSerive = require('./serieService')

describe('Services', () => {
  it('should return serie created by SerieRepository', async () => {
    const serieRepository = {
      save: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.create({})

    expect(serie).toEqual(serieRepository.save())
  })

  it('should return an error if the SerieRepository return false during save serie', async () => {
    const serieRepository = {
      save: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.create({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during save serie', async () => {
    const serieRepository = {
      save: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.create({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return all series by user from SerieRepository', async () => {
    const serieRepository = {
      all: jest.fn().mockReturnValue([
        {
          name: "Big Bang Theory",
          status: "to-watch",
          imageURL: "https://unittest.test/theoffice.png",
          author: "65fa423dc65c2600f728e3c7",
          _id: "65fb903730d922cc4fcb76ad",
          comments: [],
        }
      ])
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.fetch('65fa423dc65c2600f728e3c7')

    expect(serie).toEqual(serieRepository.all())
  })

  it('should return an error if the SerieRepository throws an exception during fetch all', async () => {
    const serieRepository = {
      all: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.fetch('65fa423dc65c2600f728e3c7')

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return serie by serie id and user id from SerieRepository', async () => {
    const serieRepository = {
      find: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.fetchByID({})

    expect(serie).toEqual(serieRepository.find())
  })

  it('should return an error if the SerieRepository return false during fetch serie by id', async () => {
    const serieRepository = {
      find: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.fetchByID({})

    expect(serie).toEqual({ error: 'Sorry, serie not found.' })
  })

  it('should return an error if the SerieRepository throws an exception during fetch serie by id', async () => {
    const serieRepository = {
      find: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.fetchByID({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return serie updated by SerieRepository', async () => {
    const serieRepository = {
      updateSerie: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateSerie({})

    expect(serie).toEqual(serieRepository.updateSerie())
  })

  it('should return an error if the SerieRepository return false during update serie', async () => {
    const serieRepository = {
      updateSerie: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateSerie({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during update serie', async () => {
    const serieRepository = {
      updateSerie: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateSerie({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return serie removed by SerieRepository', async () => {
    const serieRepository = {
      removeSerie: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteSerie({})

    expect(serie).toEqual(serieRepository.removeSerie())
  })

  it('should return an error if the SerieRepository return false during remove serie', async () => {
    const serieRepository = {
      removeSerie: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteSerie({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during remove serie', async () => {
    const serieRepository = {
      removeSerie: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteSerie({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return comment created by SerieRepository', async () => {
    const serieRepository = {
      addComments: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [
          {
            _id: '65fb852730d922cc4fcb26a1',
            text: 'The best Serie!'
          }
        ],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.createComment({})

    expect(serie).toEqual(serieRepository.addComments())
  })

  it('should return an error if the SerieRepository return false during create comment', async () => {
    const serieRepository = {
      addComments: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.createComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during create comment', async () => {
    const serieRepository = {
      addComments: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.createComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return comment updated by SerieRepository', async () => {
    const serieRepository = {
      updateComment: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [
          {
            _id: '65fb852730d922cc4fcb26a1',
            text: 'The best Serie!'
          }
        ],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateComment({})

    expect(serie).toEqual(serieRepository.updateComment())
  })

  it('should return an error if the SerieRepository return false during update comment', async () => {
    const serieRepository = {
      updateComment: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during update comment', async () => {
    const serieRepository = {
      updateComment: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.updateComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return comment removed by SerieRepository', async () => {
    const serieRepository = {
      removeComment: jest.fn().mockReturnValue({
        name: "Big Bang Theory",
        status: "to-watch",
        imageURL: "https://unittest.test/theoffice.png",
        author: "65fa423dc65c2600f728e3c7",
        _id: "65fb903730d922cc4fcb76ad",
        comments: [
          {
            _id: '65fb852730d922cc4fcb26a1',
            text: 'The best Serie!'
          }
        ],
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteComment({})

    expect(serie).toEqual(serieRepository.removeComment())
  })

  it('should return an error if the SerieRepository return false during remove comment', async () => {
    const serieRepository = {
      removeComment: jest.fn().mockReturnValue(false)
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return an error if the SerieRepository throws an exception during remove comment', async () => {
    const serieRepository = {
      removeComment: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const serieService = new SerieSerive({ serieRepository })

    const serie = await serieService.deleteComment({})

    expect(serie).toEqual({ error: 'Sorry, something went wrong.' })
  })
});