const router = require("express").Router();
const conversationController = require("../controllers/conversationController");
const { createConversationRules, chatValidation } = require("../middleware/chatMiddleware");

router.post("/", createConversationRules(), chatValidation, conversationController.createConversation);
router.get("/:memberId", conversationController.getConversationsByMemberId);

module.exports = router;
