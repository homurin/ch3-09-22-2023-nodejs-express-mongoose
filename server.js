const mongoose = require("mongoose")
const app = require("./app")
const PORT = process.env.PORT || 3000

const database = "mongodb://127.0.0.1:27017/tours"

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() =>
    console.info(
      "database successfully connected"
    )
  )

// const testTour = new Tour({
//   name: "arch",
//   rating: 4,
//   price: 10000,
// })

// testTour.save()

app.listen(PORT, () => {
  console.info(
    `Server listening at http://127.0.0.1:${PORT}`
  )
})
