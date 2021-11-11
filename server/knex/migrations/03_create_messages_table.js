exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id").primary();
    table.string("sender_id").notNullable();
    table.string("text").notNullable();
    table.string("conversation_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};