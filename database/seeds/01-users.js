const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
    {
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
    },
  ]);
};
