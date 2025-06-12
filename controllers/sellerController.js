const jwt = require("jsonwebtoken");

// ṣeller login : /api/seller/login
const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Optional: Debug log to verify inputs and environment values
    console.log("Login attempt:", { email, password });
    console.log(
      "Expected:",
      process.env.SELLER_EMAIL,
      process.env.SELLER_PASSWORD
    );

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellertoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Check if seller isAuth : /api/seller/is-auth
const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Logout seller : /api/seller/logout
const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
};
