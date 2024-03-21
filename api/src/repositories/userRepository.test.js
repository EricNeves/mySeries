const mongoose = require('mongoose')

/**
 *  Enviromnents Vars
 */
process.env.SECRET_KEY = 'admin123'

/**
 * Models
 */
const Users = require('../models/users')

/**
 * Repositories
 */
const UserRepository = require('./userRepository')

const userRepository = new UserRepository({ Users })

describe('User Repository', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb')
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create a new user', async () => {
    const data = {
      username: "admin",
      password: "admin"
    }

    await Users.deleteMany()

    const user = await userRepository.save(data)

    expect(user).toHaveProperty('username', 'admin')
  })

  it ('should return error if username already exists', async () => {
    const data = {
      username: "admin",
      password: "admin"
    }
    
    try {
      await userRepository.save(data)
      await userRepository.save(data)

    } catch (err) {
      expect(err).toBeInstanceOf(Error)

      await Users.deleteMany()
    }
  })

  it ('should authenticate user', async () => {
    const data = {
      username: "admin",
      password: "admin"
    }

    await userRepository.save(data)

    const auth = await userRepository.auth(data)

    expect(auth.length).toBeGreaterThan(0)

    await Users.deleteMany()
  })

  it ('should return false if username/password is incorrect', async () => {
    const data = {
      username: "admin",
      password: "12345"
    }

    const auth = await userRepository.auth(data)

    expect(auth).toBeFalsy()
  })

  it ('should return false if password not match', async () => {
    const data = {
      username: "admin",
      password: "12345"
    }

    await userRepository.save(data)

    const fields = {
      username: 'admin',
      password: '54321'
    }

    const auth = await userRepository.auth(fields)

    expect(auth).toBeFalsy()

    await Users.deleteMany()
  })

  it('should return user by id', async () => {
    const data = {
      username: "admin",
      password: "admin"
    }

    const save   = await userRepository.save(data)

    const userID = await Users.findOne({ username: data.username })

    const user   = await userRepository.find(userID) 

    expect(user).toHaveProperty('username', 'admin')

    await Users.deleteMany()
  })

  it ('should return false is user not found', async () => {
    const user = await userRepository.find("65fa423dc65c2600f728e3c7") 

    expect(user).toBeFalsy()
  })
})