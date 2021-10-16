const express = require("express");

const app = express();
const characterRouter = require("./routes/characterRoutes");
const weaponRouter = require("./routes/weaponRoutes");

//1. Setup Middlewares
// Middleware MUST NEXT()

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());
// To allow access to static file
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("I am middleware");
  next();
});

//2. Setup Routes
app.use("/api/v1/characters", characterRouter);
app.use("/api/v1/weapons", weaponRouter);

//3. Export app with middlewares to server.js
module.exports = app;
