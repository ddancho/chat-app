const db = require("../services/post");
const dbu = require("../services/user");

const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPost = async (req, res) => {
  try {
    const post = {
      user_id: req.body.userId,
      desc: req.body.desc,
    };

    const result = await db.createPost(post);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  const userId = req.body.id;
  const postId = req.params.id;

  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userId === post.user_id) {
      await db.updatePost(post.id, req.body);

      return res.status(200).json({ message: "The post has been updated" });
    } else {
      res.status(403).json({ message: "You can update only your post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  const userId = req.body.id;
  const postId = req.params.id;

  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userId === post.user_id) {
      await db.deletePost(post.id);

      return res.status(200).json({ message: "The post has been deleted" });
    } else {
      res.status(403).json({ message: "You can delete only your post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const likesPost = async (req, res) => {
  const userId = req.body.id;
  const postId = req.params.id;

  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let likes = post.likes ? post.likes.split(",") : [];

    if (!likes.includes(userId)) {
      likes = [userId, ...likes];
      post.likes = likes.toString();

      await db.updatePost(post.id, post);
      return res.status(200).json({ message: "The post has been liked" });
    } else {
      post.likes = likes.filter((id) => id !== userId).toString();

      await db.updatePost(post.id, post);
      return res.status(200).json({ message: "The post has been disliked" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTimelinePost = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await dbu.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followings = user.followings ? user.followings.split(",") : [];
    const userPosts = (await db.getPostsByUserId(user.id))[0];

    const userFriendsPosts = await Promise.all(
      followings.map((id) => {
        return db.getPostsByUserId(parseInt(id));
      })
    );

    return res.status(200).json({ userPosts, userFriendsPosts });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserPosts = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await dbu.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = (await db.getPostsByUserId(user.id))[0];

    return res.status(200).json({ userPosts });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likesPost,
  getTimelinePost,
  getUserPosts,
};
