const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

//GLOBACL MIDDLEWARE
server.use(express.json(), cors(), helmet());

//IMPORT ROUTERS
const welcomeRouter = require("../welcome/welcome-router");
const UserRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

//SERVER endpoints ---->
server.use("/", welcomeRouter);
server.use("/api/users", UserRouter);
server.use("/api/auth", authRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
