const knex = require("../knex/knex");

const message = {
  createMessage(message) {
    return knex("messages").insert(message);
  },
  updateMessage(id, message) {
    return knex("messages").whereRaw("id = ?", [id]).update(message);
  },
  deleteMessage(id) {
    return knex("messages").whereRaw("id = ?", [id]).del();
  },
  getMessageById(id) {
    return knex("messages").whereRaw("id = ?", [id]).first("*");
  },
  getAllMessagesByConversationId(id) {
    return knex("messages").whereRaw("conversation_id = ?", [id]).select("*");
  },
};

module.exports = message;
