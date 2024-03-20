const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: String
})

const SeriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['to-watch', 'watching', 'watched'],
    validate: {
      validator(value) {
        return value && value.length > 0
      },
      message: 'Please, insert a status (to-watch, watching or watched).'
    },
    required: true
  },
  imageURL: {
    type: String,
    validate: {
      validator(value) {
        const pattern = /^(http|https):\/\/[^\s$.?#].[^\s]*\.(jpg|jpeg|png)$/i

        return pattern.test(value)
      },
      message(props) {
        return `${props.value} is not a valid image URL.`
      }
    },
    required: true
  },
  comments: [CommentSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Series = mongoose.model('Series', SeriesSchema)

module.exports = Series