const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const authVerif = require("../middlewares/authentication");

router.post("/signup", userCtrl.signup);

router.post("/signin", userCtrl.signin);

router.get("/profile/:id", [authVerif], userCtrl.profile);
router.post("/profile", [authVerif], userCtrl.updateProfile);

module.exports = router;
