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

    user.profilePicture = req.profilePictureSlug;
    await db.updateUser(req.session.user.id, user);

    req.session.user.profilePicture = req.profilePictureSlug;

    return res.status(200).json(1);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { uploadUserProfilePicture };
