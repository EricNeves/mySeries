async function store({ serieService }, req, res) {
  const { name, status, imageURL } = req.body

  const body = {
    name, status, imageURL, author: req.user.id
  }

  const serie = await serieService.create(body)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.status(201).json({
    success: true,
    message: "Serie created successfully.",
    serie
  })
  return
}

async function series({ serieService }, req, res) {
  const { id } = req.user

  const series = await serieService.fetch(id)

  res.json({
    success: true, 
    series 
  })
  return
}

async function get({ serieService }, req, res) {
  const { id: serieID } = req.params 
  const { id: userID }  = req.user

  const fields = {
    serieID, 
    userID
  }

  const serie = await serieService.fetchByID(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.json({
    success: true, 
    serie
  })
  return
}

async function changeSerie({ serieService }, req, res) {
  const { id: serieID } = req.params 
  const { id: userID  } = req.user
  const { name, status, imageURL } = req.body

  const fields = {
    serieID, 
    userID,
    name,
    status,
    imageURL
  }

  const serie = await serieService.updateSerie(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.json({
    success: true,
    message: 'Serie updated successfully.',
    serie
  })
  return
}

async function removeSerie({ serieService }, req, res) {
  const { id: serieID } = req.params 
  const { id: userID }  = req.user

  const fields = {
    serieID, 
    userID
  }

  const serie = await serieService.deleteSerie(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.json({
    success: true,
    message: 'Serie deleted successfully.',
    serie
  })
  return
}

async function storeComment({ serieService }, req, res) {
  const { id: serieID }  = req.params 
  const { id: userID }   = req.user 
  const { comment = '' } = req.body

  const fields = {
    serieID, 
    userID,
    comment
  }

  const serie = await serieService.createComment(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.status(201).json({
    success: true,
    message: 'Comment created successfully.',
    serie
  })
  return
}

async function changeComment({ serieService }, req, res) {
  const { serie: serieID, comment: commentID }  = req.params 
  const { id: userID }   = req.user 
  const { comment = '' } = req.body

  const fields = {
    serieID,
    userID,
    commentID, 
    comment
  }

  const serie = await serieService.updateComment(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.json({
    success: true,
    message: 'Comment updated successfully.',
    serie
  })
  return
}

async function removeComment({ serieService }, req, res) {
  const { serie: serieID, comment: commentID }  = req.params 
  const { id: userID }   = req.user 

  const fields = {
    serieID,
    userID,
    commentID
  }

  const serie = await serieService.deleteComment(fields)

  if (serie?.error) {
    res.status(400).json({
      success: false,
      message: serie?.error
    })
    return
  }

  res.json({
    success: true,
    message: 'Comment deleted successfully.',
    serie
  })
  return
}

module.exports = {
  store,
  series,
  get,
  changeSerie,
  removeSerie,
  storeComment,
  changeComment,
  removeComment
}