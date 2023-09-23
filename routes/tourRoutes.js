const express = require("express")
const tourController = require("../controllers/toursController")

const router = express.Router()

// routes toures

router.param("id", tourController.checkId)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    tourController.checBody,
    tourController.createTour
  )
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(
    tourController.checBody,
    tourController.editTour
  )
  .delete(tourController.removeTour)

module.exports = router
