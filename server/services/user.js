const knex = require("../knex/knex");

const user = {
  createUser(user) {
    return knex("users").insert(user);
  },
  updateUser(id, user) {
    return knex("users").whereRaw("id = ?", [id]).update(user);
  },
  deleteUser(id) {
    return knex("users").whereRaw("id = ?", [id]).del();
  },
  getUserById(id) {
    return knex("users").whereRaw("id = ?", [id]).first("*");
  },
  getUserByEmail(email) {
    return knex("users")
      .whereRaw("email = ?", [email])
      .leftJoin("conversations", "users.current_conversation_id", "=", "conversations.id")
      .first(
        "users.id",
        "users.username",
        "users.email",
        "users.password",
        "users.profile_picture",
        "users.is_logged",
        "conversations.id as current_id",
        "conversations.members as current_members"
      );
  },
  getUserByUsername(username) {
    return knex("users").whereRaw("username = ?", [username]).first("*");
  },
};

module.exports = user;
