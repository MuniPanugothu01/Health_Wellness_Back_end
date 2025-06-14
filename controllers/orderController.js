// const Product = require("../models/Product.js");
// const Order = require("../models/Order.js");

// // palce Order COD : /api.order/COD
// const placrOrderCOD = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     if (!address || !items.length === 0) {
//       return res.json({ success: false, message: "Invalid Data!" });
//     }
//     // calculate Amount using items
//     let amount = await items.reduce(async (acc, item) => {
//       const product = await Product.findById(item.product);
//       return (await acc) + product.offerPrice * item.quantity;
//     }, 0);
//     // Add Tax Charge (2%)
//     amount += Math.floor(amount * 0.02);
//     await Order.create({
//       userId,
//       items,
//       amount,
//       address,
//       paymentType: "COD",
//     });

//     return res.json({ success: true, message: "Order Placed Successfully!" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get Orders by user ID: /api/order/user
// const getUserOrders = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const orders = await Order.find({
//       userId,
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 })
//       .sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get All Orders (for seller / admin ) : /api/order/seller

// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     }).populate("items.product address");
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   placrOrderCOD,
//   getUserOrders,
//   getAllOrders,
// };

const Product = require("../models/Product.js");
const { Order } = require("../models/Order.js");

// Place Order (COD)
const placrOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data!" });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found!" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res.json({ success: true, message: "Order Placed Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (admin/seller)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address");

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  placrOrderCOD,
  getUserOrders,
  getAllOrders,
};
