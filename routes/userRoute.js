const express = require("express");
const {
  register,
  login,
  isAuth,
  logout,
} = require("../controllers/userController.js");
const { authUser } = require("../middlewares/authUser.js");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", logout);
module.exports = {
  userRouter,
};
