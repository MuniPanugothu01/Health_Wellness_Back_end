const express = require("express");
const {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
} = require("../controllers/sellerController");
const { authSeller } = require("../middlewares/authSeller.js");

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", sellerLogout);

module.exports = {
  sellerRouter,
};
