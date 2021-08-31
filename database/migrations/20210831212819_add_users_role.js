exports.up = function (knex) {
  return (
    knex.schema
      //users
      .alterTable("users", (tbl) => {
        tbl
          .string("role_id", 128)
          .unsigned()
          .references("roles.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE")
          .defaultTo(2);
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
