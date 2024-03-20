const express  = require('express')
const app      = express()
const mongoose = require('mongoose')

const PORT      = process.env.PORT || 3131
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

/**
 * Routes
 */
const home   = require('./routes/home')
const user   = require('./routes/user')
const series = require('./routes/series')

app.use('/',       home)
app.use('/users',  user)
app.use('/series', series)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch(err => console.log(err))
