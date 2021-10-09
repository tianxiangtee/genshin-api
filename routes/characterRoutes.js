const express = require("express");
const characterController = require("./../controller/characterController");
const router = express.Router();

router
  .route("/")
  .get(characterController.getAllCharacters)
  .post(characterController.addCharacter);

module.exports = router;
