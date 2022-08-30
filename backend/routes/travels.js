const express = require("express");
const router = express.Router();
const travCtrl = require("../controllers/travels");
const authVerif = require("../middlewares/authentication");

router.get("/travels", [authVerif], travCtrl.getAll);
router.get("/travel/:id", [authVerif], travCtrl.getTravel);
router.post("/travel", [authVerif], travCtrl.addTravel);

router.post("/book/:id", [authVerif], travCtrl.book);

module.exports = router;
