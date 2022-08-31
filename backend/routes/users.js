const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const authVerif = require("../middlewares/authentication");

router.post("/signup", userCtrl.signup);

router.post("/signin", userCtrl.signin);

router.get("/profile/:id", [authVerif], userCtrl.profile);
router.get("/profile", [authVerif], userCtrl.profile);
router.post("/profile", [authVerif], userCtrl.updateProfile);

router.post("/car", [authVerif], userCtrl.addCar);
router.delete("/car/:id", [authVerif], userCtrl.removeCar);

module.exports = router;
