async function store({ userService }, req, res) {
  const { username = '', password = '' } = req.body

  const fields = {
    username,
    password
  }

  const user = await userService.create(fields)

  if (user?.error) {
    res.status(400).json({
      success: false,
      message: user?.error
    })
    return
  }

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    user
  })
  return
}

async function login({ userService }, req, res) {
  const { username = '', password = '' } = req.body

  const fields = {
    username,
    password
  }

  const auth = await userService.authenticate(fields)

  if (auth?.unauthorized) {
    res.status(401).json({
      success: false,
      message: auth?.unauthorized
    })
    return
  }

  if (auth?.error) {
    res.status(400).json({
      success: false,
      message: auth?.error
    })
    return
  }

  res.json({
    success: true,
    jwt:     auth
  })
  return
}

async function user({ userService }, req, res) {
  const user = await userService.fetchUser(req.user)

  if (user?.error) {
    res.status(400).json({
      success: false,
      message: user?.error
    })
    return
  }

  res.json({
    success: true,
    user:    req.user
  })
  return
}

module.exports = {
  store,
  login,
  user
}