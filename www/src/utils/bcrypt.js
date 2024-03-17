const bcrypt = require('bcrypt')

const hashPassword = (bcrypt) => async (password) => {
  if (password.length > 1) {
    return bcrypt.hash(password, 10)
  }
}

const comparePassword = (bcrypt) => async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  hashPassword:    hashPassword(bcrypt),
  comparePassword: comparePassword(bcrypt),
  pure: {
    hashPassword,
    comparePassword
  }
}