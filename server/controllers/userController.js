const db = require("../services/user");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, profile_picture: profilePicture } = user;

    return res.status(200).json({ username, profilePicture });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const userId = req.body.id;
  const id = req.params.id;

  if (userId === id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await db.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await db.updateUser(id, req.body);
      return res.status(200).json({ message: "User information has been updated" });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "Wrong account id" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.body.id;
  const id = req.params.id;

  if (userId === id) {
    try {
      const user = await db.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await db.deleteUser(id);
      return res.status(200).json({ message: "User account has been deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "Wrong account id" });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
