const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const authVerif = require("../middlewares/authentication");
const adminVerif = require("../middlewares/admin");

router.post("/signup", userCtrl.signup);

router.post("/signin", userCtrl.signin);

router.get("/profile/:id", [authVerif], userCtrl.profile);
router.get("/profile", [authVerif], userCtrl.profile);
router.post("/profile", [authVerif], userCtrl.updateProfile);
router.delete("/membreDelete/:id", [authVerif], userCtrl.deleteAccount);

router.post("/car", [authVerif], userCtrl.addCar);
router.delete("/car/:id", [authVerif], userCtrl.removeCar);

router.get("/admin/users", [adminVerif], userCtrl.getUsers);
router.get("/admin/cars", [adminVerif], userCtrl.getCars);
router.get("/admin/travels", [adminVerif], userCtrl.getTravels);

router.post("/admin/login", userCtrl.adminLogin);

module.exports = router;
