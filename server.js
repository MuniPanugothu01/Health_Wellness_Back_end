const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
// dotenv file
const dotenv = require("dotenv");
dotenv.config();
// db.js file
const { connectDB } = require("./configs/db.js");
const { userRouter } = require("./routes/userRoute.js");
connectDB();
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
app.use('/api/user',userRouter)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server started on " + port);
});
