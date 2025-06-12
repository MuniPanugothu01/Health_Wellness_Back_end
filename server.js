const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
// Required to parse JSON bodies
app.use(express.json());
app.use(express.json()); // For parsing JSON request bodies
app.use(cookieParser()); // Required to read cookies

// dotenv file
const dotenv = require("dotenv");
dotenv.config();
// db.js file
const { connectDB } = require("./configs/db.js");
const { userRouter } = require("./routes/userRoute.js");
const { sellerRouter } = require("./routes/sellerRoute.js");
const { connectCloudinary } = require("./configs/Cloudinary.js");
const { productRouter } = require("./routes/productRoute.js");
const { cartRouter } = require("./routes/cartRoute.js");
const { addressRouter } = require("./routes/addressRoute.js");
const { orderRouter } = require("./routes/orderRoute.js");
connectDB();
connectCloudinary();

//cors is used to connect the frontend to backend
// allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("api is working");
});
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server started on " + port);
});
