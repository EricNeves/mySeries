const HomeService = require('./homeService');

describe('Services', () => {
  it('should return the welcome message', () => {
    const homeRepository = {
      message: jest.fn().mockReturnValue({
        success: true,
        author: "Eric Neves <github.com/ericneves>",
        message: "Welcome to the My Series API."
      })
    }

    const homeService = new HomeService({ homeRepository })

    homeService.fetchMessage()

    expect(homeRepository.message).toHaveBeenCalled()
  })
})