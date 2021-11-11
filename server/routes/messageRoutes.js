const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { createMessageRules, chatValidation } = require("../middleware/chatMiddleware");

router.post("/", createMessageRules(), chatValidation, messageController.createMessage);
router.get("/:conversationId", messageController.getAllMessages);

module.exports = router;
