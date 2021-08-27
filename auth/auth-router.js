const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/middlewarel-global");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hashedPassword;
  Users.registerUser(credentials)
    .then((user) => {
      const token = generateToken(user);
      user
        ? res.json({ user, token })
        : res.json({ message: `can't post the user` });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        //add token
        const token = generateToken(user);
        console.log("LOGIN token -------> ", token);
        res.json({ success: `welcome ${user.username}, have a token!`, token });
      } else {
        res.json({ no_credentcials: `Please enter correct credentials` });
      }
    })
    .catch((err) => next(err));
});

// function generateToken(user) {
//   const payload = {
//     subID: user.id,
//     username: user.username,
//     email: user.email,
//   };
//   //options
//   const options = {
//     expiresIn: "1d",
//   };
//   //return the jwt signature
//   return jwt.sign(payload, process.env.JWT_SECRET, options);
// }

module.exports = router;
