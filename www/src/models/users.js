const mongoose = require('mongoose')
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UsersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash 

  return next()
})

UsersSchema.methods.comparePassword = function (password) {
  return new Promise(async (resolve, reject) => {
    const matchPassword = await bcrypt.compare(password, this.password)

    if (!matchPassword) {
      resolve(false)
    }

    resolve(true)
  })
}

UsersSchema.methods.generateJWT = function (payload) {
  return new Promise(async function (resolve, reject) {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) {
        resolve(null)
      }

      resolve(token)
    })
  })
}

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users