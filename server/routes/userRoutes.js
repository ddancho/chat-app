const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/friends/:id", userController.getFriends);
router.put("/:id/follow", userController.followUser);
router.put("/:id/unfollow", userController.unfollowUser);
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
