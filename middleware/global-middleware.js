const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
};

//generate token
function generateToken(user) {
  //payload
  const payload = {
    subID: user.id,
    username: user.username,
    email: user.email,
  };
  //options
  const options = {
    expiresIn: "1d",
  };
  //return jwt.sign
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization || req.cookies.token;
    console.log(req.cookies.token);

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
          req.cookie = token;
          console.log("decodedToken------>", decodedToken);
          next();
        }
      });
    } else {
      res.json({ message: "no token provided, please enter one" });
    }
  };
}
