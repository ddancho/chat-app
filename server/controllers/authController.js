const db = require("../services/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    if (req.authErrors.length > 0) {
      const usernameErrors = [];
      const emailErrors = [];
      const passwordErrors = [];
      const confirmErrors = [];

      req.authErrors.forEach((error) => {
        error["username"] && usernameErrors.push(error["username"]);
        error["email"] && emailErrors.push(error["email"]);
        error["password"] && passwordErrors.push(error["password"]);
        error["confirm"] && confirmErrors.push(error["confirm"]);
      });
      return res.status(422).json({ usernameErrors, emailErrors, passwordErrors, confirmErrors });
    }

    const isEmailExist = await db.getUserByEmail(req.body.email);
    if (isEmailExist) {
      return res.status(422).json({ emailErrors: ["Email address is already registered"] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profile_picture: "person/noAvatar.png",
    };

    await db.createUser(user);

    const newUser = await db.getUserInfoByEmail(user.email);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    if (req.authErrors.length > 0) {
      const emailErrors = [];
      const passwordErrors = [];

      req.authErrors.forEach((error) => {
        error["email"] && emailErrors.push(error["email"]);
        error["password"] && passwordErrors.push(error["password"]);
      });
      return res.status(422).json({ emailErrors, passwordErrors });
    }

    const user = await db.getUserByEmail(req.body.email);
    if (!user) {
      return res
        .status(422)
        .json({ emailErrors: ["Email value is not found"], passwordErrors: ["Password value is not found"] });
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ emailErrors: ["Email value is not found"], passwordErrors: ["Password value is not found"] });
    }

    if (user.is_logged) {
      if (req.session && req.session.user) {
        req.session.user = null;
      }

      return res.status(422).json({ emailErrors: ["Email is already login"] });
    }

    await db.updateUser(user.id, { is_logged: true });

    // meh
    user.is_logged = 1;

    req.session.user = user;

    res.status(200).json({ userId: user.id });
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(422).json(null);
    }

    await db.updateUser(req.session.user.id, { is_logged: false });

    req.session.user = null;

    res.status(200).json(1);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
  logout,
};
