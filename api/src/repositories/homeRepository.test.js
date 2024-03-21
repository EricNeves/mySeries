const HomeRepository = require('./homeRepository')

describe('Home Repository', () => {
  it('should return the welcome message', () => {
    const homeRepository = new HomeRepository()

    const message = homeRepository.message()

    expect(message).toHaveProperty('success', true)
  })
})