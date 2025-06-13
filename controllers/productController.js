// different controller function for adding products for displaying list of products and for modifying the stock

const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product"); // ✅ Correct model import
// add Product : /api/product/add

const addProduct = async (req, res) => {
  try {
    console.log("product controller", req.body);
    const { name, description, category, price, offerPrice } = JSON.parse(
      req.body.productData
    );

    // const { name, description, category, price, offerPrice } = req.body

    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    console.log("Images URLmmmm:", imagesUrl);

    const product = await new Product({
      name: name,
      description: description,
      price: price,
      offerPrice: offerPrice,
      image: imagesUrl[0],
      category: category,
    });
    product.save();
    res.json({ success: true, message: "Product added", product });
  } catch (error) {
    console.log("Error in addProduct:", error.message);
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
// const changeStock = async (req, res) => {
//   try {
//     let { id, inStock } = req.body;
//     await Product.findByIdAndUpdate(id, { inStock });
//     res.json({ success: true, message: "Stock Updated!" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: true, message: error.message });
//   }
// };
// change Product inStock : /api/product/stock
const changeStock = async (req, res) => {
  try {
    let { id, inStock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { inStock });

    if (!updatedProduct) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Stock Updated!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports = changeStock;

module.exports = {
  addProduct,
  ProductList,
  productById,
  changeStock,
};
