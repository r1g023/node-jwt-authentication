const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restricted,
};

function generateToken(user) {
  const payload = {
    subID: user.id,
    username: user.username,
    email: user.email,
  };
  //options
  const options = {
    expiresIn: "1d",
  };
  //return the jwt signature
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restricted() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    // see if there is a token
    //check if it is valid
    //reash the header + payload + secrete and see if it matches our verify signature
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log("err in verify token middleware----->", err);
          res
            .status(401)
            .json({ message: "not verified, not the right token" });
        } else {
          //token is valid here
          req.decodedToken = decodedToken;
          console.log("decodedToken------>", decodedToken);
          next();
        }
      });
    } else {
      res.status(400).json({ message: "no token provided, please enter one" });
    }
  };
}
