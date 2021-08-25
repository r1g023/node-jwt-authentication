const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ API: "api up and running" });
});

module.exports = router;
