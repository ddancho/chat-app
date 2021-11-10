const knex = require("../knex/knex");

const conversation = {
  createConversation(conversation) {
    return knex("conversations").insert(conversation);
  },
  updateConversation(id, conversation) {
    return knex("conversations").whereRaw("id = ?", [id]).update(conversation);
  },
  deleteConversation(id) {
    return knex("conversations").whereRaw("id = ?", [id]).del();
  },
  getConversationById(id) {
    return knex("conversations").whereRaw("id = ?", [id]).first("*");
  },
  getConversationsByMemberId(id) {
    return knex("conversations")
      .whereRaw("members like (?)", [`%${id}%`])
      .select("*");
  },
};

module.exports = conversation;
