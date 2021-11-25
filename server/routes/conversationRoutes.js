const router = require("express").Router();
const conversationController = require("../controllers/conversationController");
const { createConversationRules, chatValidation } = require("../middleware/chatMiddleware");
const { isProtected } = require("../middleware/isProtected");

router.post(
  "/",
  isProtected,
  createConversationRules(),
  chatValidation,
  conversationController.createConversation
);
router.get("/:memberId", isProtected, conversationController.getConversationsByMemberId);

module.exports = router;
