const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

// Middleware configuration
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is working");
});

const port = 8080;
app.listen(port, () => {
  console.log("server started on " + port);
});
