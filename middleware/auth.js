const jwt = require("jsonwebtoken");
const config = require("config");

exports.requireSignIn = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  next();
};

exports.isAuth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
