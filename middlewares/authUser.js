
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ Correct place to store user ID
      next();
    } else {
      return res.json({ success: false, message: "Invalid Token" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

module.exports = {
  authUser,
};
