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
    return knex("users").whereRaw("email = ?", [email]).first("*");
  },
  getUserByUsername(username) {
    return knex("users").whereRaw("username = ?", [username]).first("*");
  },
};

module.exports = user;
