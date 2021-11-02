const db = require("../services/user");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  // TO DO
  // validate query values
  const id = req.query.id;
  const username = req.query.username;

  try {
    const user = id ? await db.getUserById(id) : await db.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, updated_at, ...userInfo } = user;

    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getFriends = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.followings) {
      return res.status(404).json({ message: "No followings" });
    }
    let followings = user.followings.split(",");

    const friends = await Promise.all(
      followings.map((id) => {
        return db.getUserById(id);
      })
    );

    let list = [];
    friends.map((friend) => {
      const { id, username, profilePicture } = friend;
      list.push({ id, username, profilePicture });
    });

    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const followUser = async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const userToFollow = await db.getUserById(req.params.id);
      const user = await db.getUserById(req.body.id);

      if (!userToFollow || !user) {
        return res.status(404).json({ message: "User not found" });
      }

      let followings = user.followings ? user.followings.split(",") : [];

      if (!followings.includes(String(userToFollow.id))) {
        followings = [userToFollow.id, ...followings];
        user.followings = followings.toString();
        await db.updateUser(user.id, user);

        // userToFollow -> followers
        let followers = userToFollow.followers ? userToFollow.followers.split(",") : [];

        followers = [user.id, ...followers];
        userToFollow.followers = followers.toString();
        await db.updateUser(userToFollow.id, userToFollow);

        return res.status(200).json({ message: "User has been followed" });
      } else {
        return res.status(403).json({ message: "You already follow this user" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ message: "You cant follow yourself" });
  }
};

const unfollowUser = async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const userToUnFollow = await db.getUserById(req.params.id);
      const user = await db.getUserById(req.body.id);

      if (!userToUnFollow || !user) {
        return res.status(404).json({ message: "User not found" });
      }

      let followers = userToUnFollow.followers ? userToUnFollow.followers.split(",") : [];

      if (followers.includes(String(user.id))) {
        userToUnFollow.followers = followers.filter((id) => id !== String(user.id)).toString();

        await db.updateUser(userToUnFollow.id, userToUnFollow);

        let followings = user.followings ? user.followings.split(",") : [];
        user.followings = followings.filter((id) => id !== String(userToUnFollow.id)).toString();

        await db.updateUser(user.id, user);

        return res.status(200).json({ message: "User has been unfollowed" });
      } else {
        return res.status(403).json({ message: "You already unfollow this user" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({ message: "You cant unfollow yourself" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.body.id;
  const isAdmin = req.body.admin;
  const id = req.params.id;

  if (userId === id || isAdmin) {
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
  const isAdmin = req.body.admin;
  const id = req.params.id;

  if (userId === id || isAdmin) {
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
  getFriends,
  followUser,
  unfollowUser,
  updateUser,
  deleteUser,
};
