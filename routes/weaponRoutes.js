const express = require("express");
const router = express.Router();
const weaponController = require("../controller/weaponController.js");

router
  .route("/")
  .get(weaponController.getAllWeapons)
  .post(weaponController.addWeapon);

router.route("/:id").get(weaponController.getWeapon);
module.exports = router;
