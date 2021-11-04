const express = require("express");
const characterController = require("./../controller/characterController");

const router = express.Router();

router
  .route("/")
  .get(characterController.getAllCharacters)
  .post(characterController.addCharacter);

router
  .route("/:id")
  .get(characterController.getCharacter)
  .patch(characterController.patchCharacter)
  .delete(characterController.deleteCharacter);

router
  .route("/vision-stats/:vision")
  .get(characterController.getAllCharacterStat);

module.exports = router;
