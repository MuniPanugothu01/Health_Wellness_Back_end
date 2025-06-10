const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
// POST Method middleware
router.use(express.json());

// Create the Schema
const ProductSchema = new mongoose.Schema({
  productName: String,
  Price: Number,
  Description: String,
  Category: String,
  image: String,
  Quantity: Number,
});
const ProductModel = mongoose.model("Products", ProductSchema);

router.post("/productpost/admin", async (req, res) => {
  const { productName, Price, Description, Category, image, Quantity } =
    req.body;

  const CreateProduct = new ProductModel({
    productName,
    Price,
    Description,
    Category,
    image,
    Quantity,
  });
  await CreateProduct.save();

  console.log(CreateProduct, "klk");
  res.send({ message: "Received" });
});
// GET all the products by admin
router.get("/getproduct/admin", async (req, res) => {
  try {
    let GetData = await ProductModel.find();
    res.json(GetData);
  } catch (err) {
    console.log(err);
  }
});
// Get Data
router.get("/getproduct/admin/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send("Error getting product");
  }
});

// Edit the product
router.patch("/productedit/admin/:id", async (req, res) => {
  try {
    let EditProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        overwrite: true,
      }
    );
    res.send(EditProduct);
  } catch (err) {
    res.status(400).send({ message: "not found data" });
  }
});

// DELETE the  product
router.delete("/productdelete/admin/:id", async (req, res) => {
  try {
    let DeleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    res.send(DeleteProduct);
  } catch (err) {
    res.status(500).send({ message: "try block not working" });
  }
});

// User

router.get("/user/get", async (req, res) => {
  // const {}=req.body

  try {
    let DataGet = await ProductModel.find();
    res.status(200).json(DataGet);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
});
module.exports = {
  ProductRouters: router, // correct export name
};
