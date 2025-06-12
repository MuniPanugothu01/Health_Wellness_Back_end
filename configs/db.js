const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("mongoDB connected!")
    );
    await mongoose.connect(`${process.env.MONGO_DB_URL}`);
  } catch (err) {
    console.err(err.message);
  }
};
module.exports = {
  connectDB,
};
