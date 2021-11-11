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

const userConversationSession = (req, res) => {
  try {
    if (req.session && req.session.user) {
      req.session.user.current_id = parseInt(req.body.conversationId);
      req.session.user.current_members = req.body.members;
      return res.status(201).json(1);
    }

    res.status(200).json(0);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { userSession, userConversationSession };
