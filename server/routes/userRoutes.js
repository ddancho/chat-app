const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.get("/", userController.getAllUsers);

module.exports = router;
