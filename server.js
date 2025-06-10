const express = require("express");
const app = express();
// DbConnect database file
const { DbConnect } = require("./db_user.js");
const { mongoose } = require("mongoose");
DbConnect();
// bcrypt imported
const bcrypt = require("bcrypt");

// Import the Products folder
const { ProductRouters } = require("./Products/index.js");
app.use("/api", ProductRouters);
// POST middle ware

app.use(express.json());

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String,
});
const UserModel = mongoose.model("users", UserSchema);
// Encrypted function
async function toEncrypt(input) {
  try {
    let SaltGen = await bcrypt.genSalt(10);
    return await bcrypt.hash(input, SaltGen);
  } catch (err) {
    console.log(err);
  }
}

// Compared function password
async function ComparedPassepord(password, hashedpassword) {
  try {
    return await bcrypt.compare(password, hashedpassword);
  } catch (err) {
    res.status(409).send({ message: "passowrd converted to normal" });
  }
}

app.post("/admin/register", async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !role || !password) {
    res.status(400).send({ message: "please fill the all fields" });
  }
  // Email validate
  let ExistingEmail = await UserModel.findOne({ email });
  if (ExistingEmail) {
    res.status(409).send({ message: "mail is already exists" });
  }

  let encryptedPassword = await toEncrypt(password);

  let SignupData = new UserModel({
    name: name,
    email: email,
    role: role,
    password: encryptedPassword,
  });
  await SignupData.save();

  res.status(200).send({ message: "Successfully registered" });

});

// ADMIN Login
app.post("/admin/signin", async (req, res) => {
  const { name, role, email, password } = req.body;
  if (!name || !role || !email || !password) {
    res.status(400).send({ message: "please fill all fields" });
  }
  // to check mail matching or nor
  const CheckMail = await UserModel.findOne({ email });
  if (CheckMail) {
    res.status(401).send({ message: "Invalid mail address" });
  }
  // Check the password is Matching or not
  let isValid = await ComparedPassepord(password, UserModel.password);
  if (isValid) {
    return res.status(401).send({ message: "Passowrd is Invalid" });
  }
// JWT Tokens
// const Jwt = require("jsonwebtoken");
// const token = Jwt.



  res.status(200).send({ message: "login successfully" });
});

const port = 8080;
app.listen(port, () => {
  console.log("server started on " + port);
});
