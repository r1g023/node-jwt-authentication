const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res, next) => {});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
});

module.exports = router;
