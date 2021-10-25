const db = require("../services/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    };

    const result = await db.createUser(user);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await db.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(404).json({ message: "Wrong password" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
