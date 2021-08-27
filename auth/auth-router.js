const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/global-middleware");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hashedPassword;
  Users.registerUser(credentials)
    .then((user) => {
      const token = generateToken(user);
      user
        ? res.json({ user, token })
        : res.json({ message: "cant post user" });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        res.json({ success: `welcome ${user.username}, have a token!`, token });
      } else {
        res.json({ no_credentials: `username and password required` });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
