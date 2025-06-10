// dotenv file
const dotenv = require("dotenv");
dotenv.config();

// mongoose
const mongoose = require("mongoose");

function DbConnect() {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("connected mongodb");
    })
    .catch((err) => {
      console.log("not connected");
    });
}
module.exports = {
  DbConnect,
};
