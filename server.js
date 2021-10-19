const dotenv = require("dotenv");
const mongoose = require("mongoose");

// IMPORTANT : SETUP CONFIG ENV before app declare
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// Check env
// console.log(process.env);
//Get express app from app.js to setup server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Starting ${process.env.NODE_ENV} server`);
});
