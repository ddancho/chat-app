const db = require("../services/message");
const dbUser = require("../services/user");

const createMessage = async (req, res) => {
  try {
    if (req.chatErrors.length > 0) {
      const conversationIdErrors = [];
      const senderIdErrors = [];
      const senderNameErrors = [];
      const senderProfilePictureErrors = [];
      const textErrors = [];

      req.chatErrors.forEach((error) => {
        error["conversationId"] && conversationIdErrors.push(error["conversationId"]);
        error["senderId"] && senderIdErrors.push(error["senderId"]);
        error["senderName"] && senderNameErrors.push(error["senderName"]);
        error["senderProfilePicture"] && senderProfilePictureErrors.push(error["senderProfilePicture"]);
        error["text"] && textErrors.push(error["text"]);
      });

      return res.status(422).json({ senderIdErrors, textErrors, conversationIdErrors });
    }

    const message = {
      conversation_id: req.body.conversationId,
      sender_id: req.body.senderId,
      sender_name: req.body.senderName,
      sender_profile_picture: req.body.senderProfilePicture,
      text: req.body.text,
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
