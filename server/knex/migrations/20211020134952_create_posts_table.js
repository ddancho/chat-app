exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.string("desc").defaultTo("");
    table.string("img").defaultTo("");
    table.text("likes").defaultTo("");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .references("id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
