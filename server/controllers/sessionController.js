const userSession = (req, res) => {
  try {
    let user = {};

    if (!req.session || !req.session.user) {
      user = {
        userInfo: {},
        currentConversation: {},
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

module.exports = { userSession };
