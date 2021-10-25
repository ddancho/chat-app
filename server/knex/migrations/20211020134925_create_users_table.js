exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").collate("utf8_bin").unique().notNullable();
    table.string("password").notNullable();
    table.string("profilePicture").defaultTo("");
    table.string("coverPicture").defaultTo("");
    table.text("followers").defaultTo("");
    table.text("followings").defaultTo("");
    table.boolean("isAdmin").defaultTo(false);
    table.string("desc").defaultTo("");
    table.string("city").defaultTo("");
    table.string("from").defaultTo("");
    table.enu("relationship", [1, 2, 3]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
