// different controller function for adding products for displaying list of products and for modifying the stock

const { Product } = require("../models/Product.js");

const cloudinary = require("cloudinary").v2;

// add Product : /api/product/add
const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get Product : /api/product/list
const ProductList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get single Product by Id : /api/product/id
const productById = async (req, res) => {
  try {
    let { id } = req.body;
    let product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// change Product inStock : /api/product/stock
const changeStock = async (req, res) => {
  try {
    let { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

module.exports = {
  addProduct,
  ProductList,
  productById,
  changeStock,
};
