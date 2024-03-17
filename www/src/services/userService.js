class UserService {
  constructor({ userRepository, jwt, SECRET_KEY, bcrypt }) {
    this.userRepository = userRepository
    this.SECRET_KEY     = SECRET_KEY
    this.jwt            = jwt
    this.bcrypt         = bcrypt
  }

  async create(body) {
    try {
      const password = await this.bcrypt.hashPassword(body.password)

      const fields = { ...body, password }

      const user = await this.userRepository.save(fields)

      return user

    } catch (err) {
      if (err.code === 11000) return { error: 'Sorry, username already exists.' }
      return { error: err.message }
    }
  }

  async authenticate(body) {
    try {
      const auth = await this.userRepository.auth(body)

      if (!auth) {
        return { unauthorized: 'Sorry, username/password is incorrect.' }
      }

      return this.jwt.sign(auth, this.SECRET_KEY)

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