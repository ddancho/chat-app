const dbUser = require("../services/user");

const userSession = (req, res) => {
  try {
    let user = {};

    if (!req.session || !req.session.user) {
      user = {
        userInfo: {},
        lastOpenConversation: {},
      };
    } else {
      user = {
        userInfo: {
          id: req.session.user.id.toString(),
          username: req.session.user.username,
          email: req.session.user.email,
          profilePicture: req.session.user.profile_picture,
        },
        lastOpenConversation: req.session.user.current_id
          ? {
              id: req.session.user.current_id,
              members: req.session.user.current_members,
            }
          : [],
      };
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const userConversationSession = async (req, res) => {
  try {
    if (req.session && req.session.user) {
      req.session.user.current_id = parseInt(req.body.conversationId);
      req.session.user.current_members = req.body.members;

      await dbUser.updateUser(req.session.user.id, {
        current_conversation_id: parseInt(req.body.conversationId),
      });

      const ids = req.body.members.split(",");
      const otherUserId = ids.find((i) => parseInt(i) !== req.session.user.id);

      const otherUser = await dbUser.getUserById(parseInt(otherUserId));
      if (otherUser && otherUser.current_conversation_id === null) {
        await dbUser.updateUser(parseInt(otherUserId), {
          current_conversation_id: parseInt(req.body.conversationId),
        });
      }

      return res.status(201).json(1);
    }

    res.status(200).json(0);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { userSession, userConversationSession };
