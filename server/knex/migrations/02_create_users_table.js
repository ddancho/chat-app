exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").collate("utf8_bin").unique().notNullable();
    table.string("password").notNullable();
    table.string("profile_picture").defaultTo("");
    table.integer("current_conversation_id").unsigned();
    table.boolean("is_logged").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.foreign("current_conversation_id").references("id").inTable("conversations");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
