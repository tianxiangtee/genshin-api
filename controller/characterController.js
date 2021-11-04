const Character = require("./../models/characterModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllCharacters = async (req, res) => {
  // EXECUTE QUERY
  // Example : localhost:3000/api/v1/characters?vision=Pyro&sort=-name&limit=2&fields=name&page=1
  // API Features allow user to key in variable for below:
  // filterColumn --> prop inside schema, exp : vision
  // sort --> prop want to be sort, - for desc, exp: -name
  // limit --> use with page, limit a page show results, exp: 3
  // page --> use with limit, show which page, exp 4
  // fields --> select prop wanted to be shown, exp name, vision
  const features = new APIFeatures(Character.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const characters = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "Success",
    results: characters.length,
    data: {
      characters,
    },
  });
};

exports.getCharacter = async (req, res) => {
  console.log(req.params.id);
  try {
    const character = await Character.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        character,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
  // res.status(200).json({ status: "Success", message: "Get One Character" });
};

exports.addCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        character: newCharacter,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};

exports.patchCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Patch a character" });
};

exports.deleteCharacter = (req, res) => {
  res.status(200).json({ status: "Success", message: "Delete a character" });
};

exports.getAllCharacterStat = async (req, res) => {
  try {
    const stats = await Character.aggregate([
      {
        $match: { vision: { $eq: req.params.vision } },
      },
      {
        $group: {
          _id: { $toUpper: "$rarity" },
          numCharacter: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
