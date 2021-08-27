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
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
//restricted
function restrictedUser() {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            console.dir(err);
            return res
              .status(401)
              .json({ message: "CANT LOGIN, INVALID TOKEN" });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        res.json({ message: "you dont have access to this feature" });
      }
    } catch (error) {
      console.log("Hello");
      next(error);
    }
  };
}
