const router = require("express").Router();
const sessionController = require("../controllers/sessionController");

router.get("/user", sessionController.userSession);

module.exports = router;
