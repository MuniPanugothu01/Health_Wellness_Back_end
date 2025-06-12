// create a function that will registered user in the database
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register user : /api/user/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user data
    const user = await User.create({ name, email, password: hashedPassword });

    // create the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // send the token
    res.cookie("token", token, {
      httpOnly: true, // prevent Javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookie in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
    });

    // send this response to frontend
    return res.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  register,
};
