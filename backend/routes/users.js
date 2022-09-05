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

router.post("/message", [authVerif], userCtrl.addMessage);
router.get("/messages", [authVerif], userCtrl.getMessages);
router.get("/message/:id", [authVerif], userCtrl.getMessage);
router.delete("/message/:id", [authVerif], userCtrl.deleteMessage);

router.post("/notif", [authVerif], userCtrl.addNotif);
router.get("/notifs", [authVerif], userCtrl.getNotifs);
router.get("/notif/:id", [authVerif], userCtrl.getNotif);

module.exports = router;
