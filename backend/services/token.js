const jwt = require("jsonwebtoken");

exports.createToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}