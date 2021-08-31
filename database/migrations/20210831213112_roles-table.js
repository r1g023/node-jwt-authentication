exports.up = function (knex) {
  return knex.schema.createTable("roles", function (tbl) {
    tbl.increments("id");
    tbl.string("role", 128).notNull().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles");
};
