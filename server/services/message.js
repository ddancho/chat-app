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
    return knex("messages")
      .whereRaw("messages.id = ?", [id])
      .join("users", "messages.sender_id", "=", "users.id")
      .first(
        "messages.id as id",
        "messages.conversation_id as conversation_id",
        "messages.sender_id as sender_id",
        "messages.sender_name as sender_name",
        "messages.text as text",
        "messages.created_at as created_at",
        "messages.updated_at as updated_at",
        "users.profile_picture as sender_profile_picture"
      );
  },
  getAllMessagesByConversationId(id) {
    return knex("messages")
      .whereRaw("conversation_id = ?", [id])
      .join("users", "messages.sender_id", "=", "users.id")
      .select(
        "messages.id as id",
        "messages.conversation_id as conversation_id",
        "messages.sender_id as sender_id",
        "messages.sender_name as sender_name",
        "messages.text as text",
        "messages.created_at as created_at",
        "messages.updated_at as updated_at",
        "users.profile_picture as sender_profile_picture"
      );
  },
};

module.exports = message;
