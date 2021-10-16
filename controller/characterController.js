exports.getAllCharacters = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get All Character" });
};

exports.getCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get One Character" });
};

exports.addCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Create a character" });
};

exports.patchCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Patch a character" });
};

exports.deleteCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Delete a character" });
};
