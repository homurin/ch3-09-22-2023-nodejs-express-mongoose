const fs = require("fs")
const Tour = require("../models/tourModel")

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const checkId = async (req, res, next, val) => {
  try {
    const tour = await Tour.find({
      _id: req.params.id,
    })
    next()
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: `Data with id ${val} not found`,
    })
  }
}
const checBody = (req, res, next) => {
  if (!req.body.name && !req.body.price) {
    return res.status(404).json({
      status: "failed",
      message: `name or price is required`,
    })
  }
  next()
}

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "sucess",
      requestTime: req.requestTime,
      length: tours.length,
      data: tours,
    })
  } catch (err) {
    res.status(404).json({
      status: "failed",
      requestTime: req.requestTime,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tours = await Tour.findById(
      req.params.id
    )
    res.status(200).json({
      status: "sucess",
      requestTime: req.requestTime,
      length: tours.length,
      data: tours,
    })
  } catch (err) {
    res.status(404).json({
      status: "failed",
      requestTime: req.requestTime,
    })
  }
}

const createTour = async (req, res) => {
  // generate id for new data
  try {
    const newData = await Tour.create(req.body)

    res.status(201).json({
      status: "success",
      data: {
        tour: newData,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = req.body
    const newTour = await Tour.findByIdAndUpdate(
      filter,
      update,
      { new: true }
    )
    // if (!newTour) {
    //   return res.status(404).json({
    //     status: "failed",
    //     message: `data with id ${req.params.id} not found`,
    //   })
    // }
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id
    const deleteTour =
      await Tour.findByIdAndDelete(id)
    // if (!deleteTour) {
    //   return res.status(404).json({
    //     status: "failed",
    //     message: `data with id ${req.params.id} not found`,
    //   })
    // }
    res.status(201).json({
      status: "success",
      data: {
        tour: deleteTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  checkId,
  checBody,
  getAllTours,
  getTourById,
  createTour,
  editTour,
  removeTour,
}
