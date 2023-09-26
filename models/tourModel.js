const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "tour name required"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "price name required"],
  },
})

const Tour = mongoose.model("Tour", tourSchema)
// const createTour = async (req, res) => {
//   // generate id for new data
//   try {
//     const newData = await Tour.create(req.body)

//     res.status(201).json({
//       status: "success",
//       data: {
//         tour: newData,
//       },
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(201).json({
//       status: "failed",
//       message: err.toString(),
//     })
//   }
// }

module.exports = Tour
