class UserRepository {
  constructor({ Users, bcrypt }) {
    this.Users  = Users
    this.bcrypt = bcrypt
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

    return {
      id:       user._id,
      username: user.username,
      roles:    user.roles
    }
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