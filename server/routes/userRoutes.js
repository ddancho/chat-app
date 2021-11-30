const router = require("express").Router();
const userController = require("../controllers/userController");
const { isProtected } = require("../middleware/isProtected");

router
  .route("/:id")
  .get(isProtected, userController.getUser)
  .put(isProtected, userController.updateUser)
  .delete(isProtected, userController.deleteUser);

router.get("/", userController.getAllUsers);

module.exports = router;
