const tokenService = require("../services/token");

const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(200).json({ message: { txt: "mauvais token" } });
  }

  const decodedToken = tokenService.verifyToken(token).data;
  const adminId = decodedToken.adminid;
  const isAdmin = decodedToken.isAdmin;

  req.adminId = adminId;
  req.isAdmin = isAdmin;

  if (isAdmin) {
    return next();
  } else {
    return res.sendStatus(200).json({ message: { txt: "T'es pas admin" } });
  }
};

module.exports = authenticateAdminToken;
