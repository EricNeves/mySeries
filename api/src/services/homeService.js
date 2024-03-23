class HomeService {
  constructor({ homeRepository }) {
    this.homeRepository = homeRepository
  }

  fetchMessage() {
    return this.homeRepository.message()
  }
}

module.exports = HomeService