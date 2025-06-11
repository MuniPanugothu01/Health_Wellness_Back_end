// create a function that will registered user in the database

import { User } from "../models/user";

// Register user : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user Already exists" });
    }

    
  } catch (err) {}
};
