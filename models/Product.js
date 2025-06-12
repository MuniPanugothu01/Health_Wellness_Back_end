// models/User.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: Number, required: true },
    inSrock: {
      type: Boolean,
      of: mongoose.Schema.Types.Mixed,
      default: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.model.product || mongoose.model("product", productSchema);

module.exports = {
  Product,
};
