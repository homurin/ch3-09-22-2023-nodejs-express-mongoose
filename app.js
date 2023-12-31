const express = require("express")
const morgan = require("morgan")
const fs = require("fs")
const yaml = require("js-yaml")
const swaggerUi = require("swagger-ui-express")
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()
const swaggerDocument = yaml.load(
  fs.readFileSync(
    "./swagger/swagger.yaml",
    "utf-8"
  )
)

app.use(express.json())
app.use(morgan("dev"))
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
app.use(express.static(`${__dirname}/public/`))

app.use((req, res, next) => {
  console.log(
    "Hello FSW-2 Di middlware kita sendiri "
  )
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/tours", tourRouter)

module.exports = app
