const jwt = require("jsonwebtoken");

const authSeller = async (req, res, next) => {
  const { sellertoken } = req.cookies;
  if (!sellertoken) {
    return res.json({ success: true, message: "Not Authorized" });
  }
  try {
    const tokenDecode = jwt.verify(sellertoken, process.env.JWT_SECRET);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    console.log("catch auth", err.message);
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  authSeller,
};
