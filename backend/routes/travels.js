const express = require("express");
const router = express.Router();
const travCtrl = require("../controllers/travels");
const authVerif = require("../middlewares/authentication");

router.get("/travels", travCtrl.getAll);

module.exports = router;
