exports.up = function (knex) {
  return knex.schema.createTable("users", function (tbl) {
    tbl.increments("id");
    tbl.string("email", 128).notNull().unique();
    tbl.string("username", 128).notNull().unique();
    tbl.string("password", 128).notNull().unique();
  });
};

exports.down = function (knex) {
  return knex.schemadropTableIfExists("users");
};
