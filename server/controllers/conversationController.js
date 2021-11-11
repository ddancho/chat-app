const db = require("../services/conversation");
const dbUser = require("../services/user");

const createConversation = async (req, res) => {
  try {
    const emailErrors = [];

    if (req.chatErrors.length > 0) {
      req.chatErrors.forEach((error) => {
        error["memberEmail"] && emailErrors.push(error["memberEmail"]);
      });

      return res.status(422).json({ emailErrors });
    }

    const member = await dbUser.getUserByEmail(req.body.memberEmail);
    if (!member) {
      return res.status(422).json({ emailErrors: ["No account with that email address"] });
    }

    const members = [req.session.user.id, member.id].toString();

    const id = await db.createConversation({ members });

    const conversation = await db.getConversationById(id);

    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getConversationsByMemberId = async (req, res) => {
  try {
    const conversations = await db.getConversationsByMemberId(req.params.memberId);
    if (!conversations) {
      return res.status(404).json({ error: "Conversations not found" });
    }
    return res.status(200).json(conversations);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createConversation,
  getConversationsByMemberId,
};
