const router = require("express").Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);

router.put("/:id/likes", postController.likesPost);

router.get("/timeline/:userId", postController.getTimelinePost);
router.get("/profile/:username", postController.getUserPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
