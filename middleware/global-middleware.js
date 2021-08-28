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
    lat: Date.now(),
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    token
      ? jwt.sign(
          token,
          process.env.JWT_SECRET,
          (err, decodedToken) =>
            err
              ? res.json({ message: "not verified, not the right token", err })
              : (req.decodedToken = decodedToken),
          next()
        )
      : res.json({ message: "to token provided, please enter one" });
  };
}