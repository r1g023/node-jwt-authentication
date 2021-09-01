exports.seed = function (knex) {
  return knex("roles").insert([
    { id: 1, role: "admin" },
    { id: 2, role: "student" },
  ]);
};
