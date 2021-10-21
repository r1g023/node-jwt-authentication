"use strict";
const axios = require("axios");
const router = require("express").Router();
const redis = require("redis");
const PORT_REDIS = 6379;
const redisClient = redis.createClient(PORT_REDIS);
const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};
const get = (req, res, next) => {
  let key = req.route.path;
  redisClient.get(key, (error, data) => {
    if (error) res.status(400).send(err);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};
router.get("/", get, (req, res, next) => {
  let requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters", requestOptions)
    .then((resolve) => {
      set(req.route.path, resolve.data);
      res.json(resolve.data);
    })
    .catch((err) => next(err));
});

module.exports = router;
