const router = require("express").Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.createMessage);
router.get("/:conversationId", messageController.getAllMessages);

module.exports = router;
