const express = require("express");
const morgan = require("morgan");

const app = express();
const characterRouter = require("./routes/characterRoutes");
const weaponRouter = require("./routes/weaponRoutes");

//1. Setup Middlewares
// Middleware MUST NEXT()

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());
// To allow access to static file
app.use(express.static(`${__dirname}/public`));

// Optional log package
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use((req, res, next) => {
    console.log("I am custom middleware");
    next();
  });
}

//2. Setup Routes
app.use("/api/v1/characters", characterRouter);
app.use("/api/v1/weapons", weaponRouter);

//3. Export app with middlewares to server.js
module.exports = app;
