const db = require("../services/user");

const uploadUserProfilePicture = async (req, res) => {
  try {
    if (req.fileError) {
      return res.status(400).json(req.fileError);
    }

    const user = await db.getUserById(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.updateUser(req.session.user.id, { profile_picture: req.profilePictureSlug });

    req.session.user.profile_picture = req.profilePictureSlug;

    return res
      .status(200)
      .json({ userId: req.session.user.id, profilePicture: req.session.user.profile_picture });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { uploadUserProfilePicture };
