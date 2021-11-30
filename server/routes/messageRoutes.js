const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { createMessageRules, chatValidation } = require("../middleware/chatMiddleware");
const { isProtected } = require("../middleware/isProtected");

router.post("/", isProtected, createMessageRules(), chatValidation, messageController.createMessage);
router.get("/:conversationId", isProtected, messageController.getAllMessages);

module.exports = router;
