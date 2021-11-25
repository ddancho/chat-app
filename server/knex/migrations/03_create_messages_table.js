exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id").primary();
    table.integer("conversation_id").unsigned().notNullable();
    table.integer("sender_id").unsigned().notNullable();
    table.string("sender_name").notNullable();
    table.string("text").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
