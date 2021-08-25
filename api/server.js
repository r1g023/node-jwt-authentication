const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

//GLOBACL MIDDLEWARE
server.use(express.json(), cors(), helmet());

//IMPORT ROUTERS
const welcomeRouter = require("../welcome/welcome-router");

//SERVER endpoints ---->
server.use("/", welcomeRouter);

module.exports = server;
