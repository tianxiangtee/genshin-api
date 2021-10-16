const dotenv = require("dotenv");

// IMPORTANT : SETUP CONFIG ENV before app declare
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Check env
// console.log(process.env);
//Get express app from app.js to setup server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Starting ${process.env.NODE_ENV} server`);
});
