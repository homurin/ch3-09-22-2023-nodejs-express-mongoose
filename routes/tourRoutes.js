const express = require("express")
const tourController = require("../controllers/toursController")
const checkBody = require("../middleware/checkBody")
const checkId = require("../middleware/checkId")
const router = express.Router()

// routes toures

router.param("id", checkId)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(checkBody, tourController.createTour)

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(checkBody, tourController.editTour)
  .delete(tourController.removeTour)

module.exports = router
