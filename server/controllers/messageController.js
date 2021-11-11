const db = require("../services/message");
const dbUser = require("../services/user");

const createMessage = async (req, res) => {
  try {
    if (req.chatErrors.length > 0) {
      const senderIdErrors = [];
      const textErrors = [];
      const conversationIdErrors = [];

      req.chatErrors.forEach((error) => {
        error["senderId"] && senderIdErrors.push(error["senderId"]);
        error["text"] && textErrors.push(error["text"]);
        error["conversationId"] && conversationIdErrors.push(error["conversationId"]);
      });

      return res.status(422).json({ senderIdErrors, textErrors, conversationIdErrors });
    }

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

    await dbUser.updateUser(req.session.user.id, {
      current_conversation_id: parseInt(req.params.conversationId),
    });

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
