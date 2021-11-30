const router = require("express").Router();
const { upload } = require("../middleware/uploadMiddleware");
const { uploadUserProfilePicture } = require("../controllers/uploadController");
const { isProtected } = require("../middleware/isProtected");

router.post("/", isProtected, upload.single("file"), uploadUserProfilePicture);

module.exports = router;
