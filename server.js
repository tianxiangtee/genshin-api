const app = require("./app");

//Get express app from app.js to setup server
const port = 3000;
app.listen(port, () => {
  console.log("Starting server ...");
});
