const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
};

function generateToken(user) {
  let payload = {
    subID: user.id,
    name: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("verify token error----->", err);
          res.json({ message: "please verify token, its incorrect" });
        } else {
          console.log("decoded token verify correct---->", decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ error: "token does not exist, please enter one" });
    }
  };
}
