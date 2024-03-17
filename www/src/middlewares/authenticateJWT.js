const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

function authenticateJWT(req, res, next) {
  const authorization = req.headers['authorization'] ?? ''

  if (!authorization) {
    res.status(401).json({
      success: false,
      message: 'Please include your bearer token in the authorization header.'
    })
    return
  }

  const authorizationSplit = authorization.split(' ')

  if (authorizationSplit.length < 2) {
    res.status(401).json({
      success: false,
      message: 'Please include your bearer token in the authorization header.'
    })
    return
  }

  const [bearer, token] = authorizationSplit

  if (bearer !== 'Bearer') {
    res.status(401).json({
      success: false,
      message: 'Please include your bearer token in the authorization header.'
    })
    return
  }

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: 'Sorry, the bearer token you provided is invalid.'
      })
      return
    }

    req.user = data
    next()
  })
}

module.exports = authenticateJWT