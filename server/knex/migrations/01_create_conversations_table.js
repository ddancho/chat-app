exports.up = function (knex) {
  return knex.schema.createTable("conversations", function (table) {
    table.increments("id").primary();
    table.text("members").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("conversations");
};
