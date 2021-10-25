const knex = require("../knex/knex");

const post = {
  createPost(post) {
    return knex("posts").insert(post);
  },
  updatePost(id, post) {
    return knex("posts").whereRaw("id = ?", [id]).update(post);
  },
  deletePost(id) {
    return knex("posts").whereRaw("id = ?", [id]).del();
  },
  getPostById(id) {
    return knex("posts").whereRaw("id = ?", [id]).first("*");
  },
  getPostsByUserId(userId) {
    return knex("posts").whereRaw("user_id = ?", [userId]).select("*");
  },
};

module.exports = post;
