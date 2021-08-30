const axios = require("axios");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  let requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters", requestOptions)
    .then((resolve) => {
      let result = [];
      resolve.data.forEach((item, index) => {
        if (index <= 0) {
          result.push(item);
        }
      });
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
