class SerieRepository {
  constructor({ Series }) {
    this.Series = Series
  }

  async save(data) {
    const serie = new this.Series(data)

    await serie.save()

    return serie
  }

  async all(userID) {
    const series = await this.Series.find({ author: userID })

    return series
  }

  async find({ serieID, userID }) {
    const serie = await this.Series.findOne({ _id: serieID, author: userID })

    return serie
  }

  async updateSerie({ serieID, userID, name, status, imageURL }) {
    const serie = await this.Series.findOneAndUpdate({ _id: serieID, author: userID }, { name, status, imageURL })

    return serie
  }

  async removeSerie({ serieID, userID }) {
    const serie = await this.Series.findOneAndDelete({ _id: serieID, author: userID })

    return serie
  }

  async addComments({ serieID, userID, comment }) {
    const newComment = {
      text: comment
    }

    const serie = await this.Series.findOneAndUpdate(
      { _id: serieID, author: userID }, 
      { $push: { comments: newComment } },
      { new: true }
    )

    return serie
  }

  async updateComment({ serieID, userID, commentID, comment  }) {
    const serie = await this.Series.findOneAndUpdate(
      { _id: serieID, author: userID, 'comments._id': commentID },
      { $set: { 'comments.$.text': comment } },
      { new: true }
    )

    return serie
  }

  async removeComment({ serieID, userID, commentID }) {
    const serie = await this.Series.findOneAndUpdate(
      { _id: serieID, author: userID },
      { $pull: { comments: { _id: commentID } } },
      { new: true }
    )

    return serie
  }
}

module.exports = SerieRepository