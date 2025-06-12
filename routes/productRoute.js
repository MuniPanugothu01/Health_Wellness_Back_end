const express = require("express");
const { upload } = require("../configs/multer.js");
const { authSeller } = require("../middlewares/authSeller.js");
const {
  addProduct,
  ProductList,
  productById,
  changeStock,
} = require("../controllers/productController.js");
const productRouter = express.Router();

productRouter.post("/add", upload.array("images"), authSeller, addProduct);


productRouter.get("/list", ProductList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStock);

module.exports = {
  productRouter,
};
