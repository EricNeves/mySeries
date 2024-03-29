class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  async create(body) {
    try {
      const user = await this.userRepository.save(body)

      return user

    } catch (err) {
      if (err.code === 11000) return { error: 'Sorry, username already exists.' }
      return { error: err.message }
    }
  }

  async authenticate(body) {
    try {
      const token = await this.userRepository.auth(body)

      if (!token) {
        return { unauthorized: 'Sorry, username/password is incorrect.' }
      }

      return token

    } catch (err) {
      return { error: err.message }
    }
  }

  async fetchUser({ id }) {
    try {
      const user = await this.userRepository.find(id)

      if (!user) return { error: 'Sorry, user does not exists.' }

      return user

    } catch (err) {
      return { error: err.message } 
    }
  }
}

module.exports = UserService