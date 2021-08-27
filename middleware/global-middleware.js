const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
};

//generate token on login and register
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

//restricted AUTH
function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        err
          ? res.json({ message: "not verified, not the right token " })
          : (req.decodedToken = decodedToken),
          next();
      });
    } else {
      res.json({ message: "no token provided, please enter one" });
    }
  };
}
