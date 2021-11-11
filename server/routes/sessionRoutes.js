const router = require("express").Router();
const sessionController = require("../controllers/sessionController");

router.get("/user", sessionController.userSession);
router.post("/user/conversation", sessionController.userConversationSession);

module.exports = router;
