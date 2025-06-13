// // models/User.js
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: Number, required: true },
//     inSrock: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// const Product =
//   mongoose.models.product || mongoose.model("product", productSchema);

// module.exports = {
//   Product,
// };
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: [String], required: true }, 
    category: { type: String, required: true }, 
    inStock: { type: Boolean, default: true }, 
    createdAt: { type: Date, default: Date.now }
  },
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
