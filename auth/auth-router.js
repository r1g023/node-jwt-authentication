const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/global-middleware");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPasswod = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hashedPasswod;
  Users.registerUser(credentials)
    .then((user) => {
      const token = generateToken(user);
      res.json({ user, token });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        res.json({ succes: `welcome ${user.username} have a token!`, token });
      } else {
        res.json({ message: "cant login user, check credentials" });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
