
const express = require("express");
const { authUser } = require("../middlewares/authUser.js");
const { authSeller } = require("../middlewares/authSeller.js");
const {
  placrOrderCOD,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController.js");

const orderRouter = express.Router();

// ✅ Make sure route paths are lowercase
orderRouter.post("/cod", authUser, placrOrderCOD);
orderRouter.post("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

// ✅ Remove unnecessary console.log (optional)
module.exports = {
  orderRouter,
};
  