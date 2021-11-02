const userSession = (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(422).json(null);
    }

    const user = {
      username: req.session.user.username,
      email: req.session.user.email,
      profilePicture: req.session.user.profilePicture,
    };

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { userSession };
