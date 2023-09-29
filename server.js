const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")
const PORT = process.env.PORT || 3000

const database = process.env.DATABASE_URL
console.info(database)
mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() =>
    console.info(
      "database successfully connected"
    )
  )
  .catch((err) => console.info(err))

app.listen(PORT, () => {
  console.info(
    `Server listening at http://127.0.0.1:${PORT}`
  )
})
