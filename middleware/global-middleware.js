const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
};

function generateToken(user) {
  const payload = {
    subID: user.id,
    name: user.username,
    email: user.email,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        err
          ? res.json({ message: "not the right token" })
          : (req.decodedToken = decodedToken),
          next();
      });
    } else {
      res.status(401).json({
        message:
          "token invalid, not logged in, enter correct login credentials",
      });
    }
  };
}
