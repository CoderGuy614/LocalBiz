const User = require("../models/User");

//Get a User By Id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password Must be At Least 6 Characters",
        });
      } else {
        user.password = password;
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        console.log("Sorry, we couldn't update your profile", err);
        return res.status(400).json({
          error: "User Update Failed",
        });
      }
      res.json(updatedUser);
    });
  });
};
