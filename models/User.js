// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: {
    type: Map, // Use Map to store dynamic object-like data
    of: mongoose.Schema.Types.Mixed, // Allows any type of value
    default: {},
  },
});

const User = mongoose.model("user", userSchema); // <-- collection name will be "users"

module.exports = User;
