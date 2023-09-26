const fs = require("fs")
const Tour = require("../models/tourModel")

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const checkId = (req, res, next, val) => {
  const tour = Tour.find(req.params.id)
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: `Data with id ${val} not found`,
    })
  }
  next()
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
    res.status(201).json({
      status: "failed",
      message: err,
    })
  }
}

const editTour = (req, res) => {
  const id = parseInt(req.params.id)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )
  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        message: `tour with id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      })
    }
  )
}

const removeTour = (req, res) => {
  const id = parseInt(req.params.id)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )
  tours.splice(tourIndex, 1)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(404).json({
        status: "Not found",
        message: `tour with id ${id} edited`,
        data: null,
      })
    }
  )
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
