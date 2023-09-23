const fs = require("fs")

const checkId = (req, res, next, val) => {
  const tour = tours.find(
    (el) => el.id === parseInt(val)
  )
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

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "sucess",
    requestTime: req.requestTime,
    data: tours,
  })
}

const getTourById = (req, res) => {
  const id = parseInt(req.params.id)
  const tour = tours.find((el) => el.id === id)

  res.status(200).json({
    status: "sucess",
    data: tour,
  })
}

const createTour = (req, res) => {
  // generate id for new data
  const newId = tours[tours.length - 1].id + 1

  const newData = Object.assign(
    { id: newId },
    req.body
  )

  tours.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      })
    }
  )
}

const editTour = (req, res) => {
  const id = parseInt(req.params.id)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  //   if (!tourIndex === -1) {
  //     return res.status(404).json({
  //       status: "failed",
  //       message: `Data with id ${id} not found`,
  //     })
  //   }
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

  //   if (!tourIndex === -1) {
  //     return res.status(404).json({
  //       status: "failed",
  //       message: `Data with id ${id} not found`,
  //     })
  //   }

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
