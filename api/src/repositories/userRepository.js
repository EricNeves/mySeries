class UserRepository {
  constructor({ Users }) {
    this.Users  = Users
  }

  async save(data) {
    const { username, password } = data

    const user = new this.Users({
      username,
      password
    })

    await user.save()

    if (!user) return false 

    return {
      id:       user._id,
      username: user.username
    }
  }

  async auth(data) {
    const { username, password } = data 

    const user = await this.Users.findOne({ username })

    if (!user) return false

    const verifyPassword = await user.comparePassword(password, user.password)

    if (!verifyPassword) return false

    const payload = {
      id:       user._id,
      username: user.username
    }

    const jwt = await user.generateJWT(payload)

    return jwt
  }

  async find(id) {
    const user = await this.Users.findOne({ _id: id })

    if (!user) return false 

    return {
      id:       user._id,
      username: user.username,
      roles:    user.roles
    }
  }
}

module.exports = UserRepository