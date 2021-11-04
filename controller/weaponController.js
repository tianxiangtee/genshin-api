exports.getAllWeapons = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get All Weapon" });
};

exports.getWeapon = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get One Weapon" });
};

exports.addWeapon = (req, res) => {
  res.status(200).json({ status: "Success", message: "Create a Weapon" });
};

exports.patchWeapon = (req, res) => {
  res.status(200).json({ status: "Success", message: "Patch a Weapon" });
};

exports.deleteWeapon = (req, res) => {
  res.status(200).json({ status: "Success", message: "Delete a Weapon" });
};
