function index({ homeService }, req, res) {
  try {
    res.json(homeService.fetchMessage())
    return

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
    return
  }
}

module.exports = {
  index
}