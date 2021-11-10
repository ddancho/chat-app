const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

router.post("/", conversationController.createConversation);
router.get("/:memberId", conversationController.getConversationsByMemberId);

module.exports = router;
