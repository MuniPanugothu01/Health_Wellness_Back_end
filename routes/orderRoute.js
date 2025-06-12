const express = require("express");
const {authUser} = require("../middlewares/authUser.js");
const {authSeller} = require("../middlewares/authSeller.js");
const {
  placrOrderCOD,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController.js");

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placrOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

console.log("Handlers:", placrOrderCOD, getUserOrders, getAllOrders);

module.exports = {
  orderRouter,
};
