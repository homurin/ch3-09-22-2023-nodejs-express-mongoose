const checkBody = (req, res, next) => {
  console.log("check body")
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "failed",
      message: `name or price is required`,
    })
  }
  next()
}

module.exports = checkBody
