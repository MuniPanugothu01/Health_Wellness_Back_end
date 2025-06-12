// models/User.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: {
    type: Map, // Use Map to store dynamic object-like data
    of: mongoose.Schema.Types.Mixed, // Allows any type of value
    default: {},
  },
}); // {minimize:false}

const Product = mongoose.model.product || mongoose.model("product", productSchema);

module.exports = {
  Product,
};
