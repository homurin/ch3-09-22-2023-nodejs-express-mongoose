const express = require("express")
const userController = require("../controllers/usersController")
const router = express.Router()

// routes users

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.editUser)
  .delete(userController.removeUser)

module.exports = router
