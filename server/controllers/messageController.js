const db = require("../services/message");

const createMessage = async (req, res) => {
  try {
    const message = {
      sender_id: req.body.senderId,
      text: req.body.text,
      conversation_id: req.body.conversationId,
    };

    const id = await db.createMessage(message);

    const newMessage = await db.getMessageById(id);

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await db.getAllMessagesByConversationId(req.params.conversationId);
    if (!messages) {
      return res.status(404).json({ error: "Messages not found" });
    }

    // req.params.conversationId je currentConversation na frontu
    // update current_conversation_id na useru

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
