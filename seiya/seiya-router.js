const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
<<<<<<< HEAD
  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters")
    .then((resolve) => {
      let result = [];
      for (let i = 0; i < resolve.data.length; i++) {
        if (i <= 1) {
=======
  const requestOptions = {
    headers: { accept: "application/json" },
  };
  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters", requestOptions)
    .then((resolve) => {
      let result = [];
      let i = 0;
      for (i; i < resolve.data.length; i++) {
        if (i <= 0) {
>>>>>>> 981deb09457c1c9301bac878c5e84ad8a6a0b173
          result.push(resolve.data[i]);
        }
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
