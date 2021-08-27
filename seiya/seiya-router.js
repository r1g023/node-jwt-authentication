const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters")
    .then((resolve) => {
      let result = [];
      for (let i = 0; i < resolve.data.length; i++) {
        if (i <= 0) {
          result.push(resolve.data[i]);
        }
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
