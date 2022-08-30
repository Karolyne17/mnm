const tokenService = require("../services/token");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(200).json({ message: { txt: "mauvais token" } });
  }

  const decodedToken = tokenService.verifyToken(token).data;
  const userId = decodedToken.userId;

  req.userId = userId;

  next();
};

module.exports = authenticateToken;
