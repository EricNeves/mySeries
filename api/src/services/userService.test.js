const UserService = require('./userService');

describe('Services', () => {
  it('should create user by UserRepository', async () => {
    const userRepository = {
      save: jest.fn().mockReturnValue({
        _id: '65fa423dc65c2600f728e3c7',
        username: 'admin'
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.create({})

    expect(user).toEqual(userRepository.save())
  })

  it('should return an error (duplicate key) if the UserRepository throws an exception during save user', async () => {
    const userRepository = {
      save: jest.fn().mockImplementation(() => {
        const error = new Error()

        error.code = 11000

        throw error
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.create({})

    expect(user).toEqual({ error: 'Sorry, username already exists.' })
  })

  it('should return an error if the UserRepository throws an exception during save user', async () => {
    const userRepository = {
      save: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.create({})

    expect(user).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return token by UserRepository', async () => {
    const userRepository = {
      auth: jest.fn().mockReturnValue({
        token: ''
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.authenticate({})

    expect(user).toEqual(userRepository.auth())
  })

  it('should return an error if the UserRepository throws an exception during authenticate user', async () => {
    const userRepository = {
      auth: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.authenticate({})

    expect(user).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return false if username/password is incorrect.', async () => {
    const userRepository = {
      auth: jest.fn().mockReturnValue(false)
    }

    const userService = new UserService({ userRepository })

    const user = await userService.authenticate({})

    expect(user).toEqual({ unauthorized: 'Sorry, username/password is incorrect.' })
  })

  it('should return user by id from UserRepository', async () => {
    const userRepository = {
      find: jest.fn().mockReturnValue({
        id: "65ff2dd47b2bbecab44b768d",
        username: "admin",
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.fetchUser({})

    expect(user).toEqual(userRepository.find())
  })

  it('should return an error if the UserRepository throws an exception during fetch user', async () => {
    const userRepository = {
      find: jest.fn().mockImplementation(() => {
        throw new Error('Sorry, something went wrong.')
      })
    }

    const userService = new UserService({ userRepository })

    const user = await userService.fetchUser({})

    expect(user).toEqual({ error: 'Sorry, something went wrong.' })
  })

  it('should return false if user not found', async () => {
    const userRepository = {
      find: jest.fn().mockReturnValue(false)
    }

    const userService = new UserService({ userRepository })

    const user = await userService.fetchUser({})

    expect(user).toEqual({ error: 'Sorry, user does not exists.' })
  })
});