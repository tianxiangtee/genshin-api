const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "A character must have a name"],
      unique: true,
      maxlength: [
        40,
        "A character name must have less or equal than 40 characters",
      ],
      minlength: [
        1,
        "A character name must have more or equal than 10 characters",
      ],
    },
    vision: {
      type: "String",
      required: [true, "A character must vision"],
      enum: {
        values: ["Pyro", "Hydro", "Electro", "Cryo", "Dendro", "Anemo", "Geo"],
        message:
          "As of now, there are only seven visions in Genshin Impact, namely, Pyro, Hydro, Electro, Cryo, Dendro, Anemo, and Geo.",
      },
    },
    weapon: {
      type: "String",
      required: [true, "A character must vision"],
      enum: {
        values: ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"],
        message:
          "As of now, there are only five weapons in Genshin Impact, namely, Bow, Catalyst, Claymore, Polearm, and Sword.",
      },
    },
    nation: {
      type: "String",
      required: [true, "A character must vision"],
      enum: {
        values: [
          "Mondstadt",
          "Liyue",
          "Inazuma",
          "Sumeru",
          "Fontaine",
          "Natlan",
          "Snezhnaya",
        ],
        message:
          "Genshin Impact takes place in the world of Teyvat, and is composed of seven major nations being Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, and Snezhnaya, each ruled by a god.",
      },
    },
    affiliation: {
      type: "String",
      required: [true, "A character must have affiliation"],
    },
    rarity: {
      type: "Number",
      required: [true, "A character must have rarity"],
      min: [4, "A character must be at least rarity of 4"],
      max: [5, "A character must be below or equal to rarity of 5"],
    },
    constellation: {
      type: "String",
      required: [true, "A character must have constellation"],
    },
    birthday: {
      type: "Date",
      required: [true, "A character must have vision"],
    },
    description: {
      type: "String",
      required: [true, "A character must description"],
      minlength: [
        10,
        "A character name must have more or equal than 10 characters",
      ],
    },
    skillTalents: {
      type: ["Mixed"],
    },
    passiveTalents: {
      type: ["Mixed"],
    },
    constellations: {
      type: ["Mixed"],
    },
    vision_key: {
      type: "String",
      required: [true, "A character must vision_key"],
      enum: {
        values: ["PYRO", "HYDRO", "ELECTRO", "CRYO", "DENDRO", "ANEMO", "GEO"],
        message:
          "Only allowed PYRO, HYDRO, ELECTRO, CRYO, DENDRO, ANEMO, GEO with uppercase",
      },
      validate: {
        validator: function(val) {
          return val === this.vision.toUpperCase();
        },
        message: "Vision and vision_key must be same",
      },
    },
    weapon_type: {
      type: "String",
      required: [true, "A character must vision"],
      enum: {
        values: ["BOW", "CATALYST", "CLAYMORE", "POLEARM", "SWORD"],
        message:
          "As of now, there are only five weapons in Genshin Impact, namely, BOW, CATALYST, CLAYMORE, POLEARM, AND SWORD.",
      },
      validate: {
        validator: function(val) {
          return val === this.weapon.toUpperCase();
        },
        message: "Weapon and weapon_type must be same",
      },
    },
    images: [String],
    createAt: {
      type: "Date",
      default: Date.now(),
      select: false,
    },
    modifyAt: {
      type: "Date",
      default: Date.now(),
      select: false,
    },
    beta: {
      type: Boolean,
      default: false,
    },
  },
  {
    //   If you use toJSON() or toObject() mongoose will not include virtuals by default.
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

characterSchema.virtual("birthdayMonth").get(function() {
  if (this.birthday) return this.birthday.getMonth();
  return null;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
characterSchema.pre("save", function(next) {
  console.log("Will save document...");
  next();
});

characterSchema.post("save", function(doc, next) {
  console.log("After save document...");
  console.log(doc);
  next();
});

// QUERY MIDDLEWARE
// Use regrex to get all mongo command start with find
characterSchema.pre(/^find/, function(next) {
  //Exclude beta data
  this.find({ beta: { $ne: true } });

  // Demo purpose, add new props before a query run
  this.start = Date.now();
  next();
});

characterSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// Exclude beta data for aggregate result since above middleware only function on find
characterSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { beta: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
