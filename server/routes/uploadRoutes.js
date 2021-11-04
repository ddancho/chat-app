const router = require("express").Router();
const { upload } = require("../middleware/uploadMiddleware");
const { uploadUserProfilePicture } = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadUserProfilePicture);

module.exports = router;
