const Tour = require("../models/tourModel")

const checkId = async (req, res, next, val) => {
  try {
    const tour = await Tour.findById(val)
    next()
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: `Data with id ${val} not found`,
    })
  }
}

module.exports = checkId
