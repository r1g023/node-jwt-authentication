const router = require("express").Router();
const Users = require("../users/users-model");

router.get("/", (req, res, next) => {
  Users.get()
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      user
        ? res.json(user)
        : res.json({ message: `no user of id #${id} found` });
    })
    .catch((err) => next(err));
});

module.exports = router;
