const { Address } = require("../models/Address.js");

// Add Address : /api/address/add
const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "address added successfully😊" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get address : /api/address/get
const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addAddress,
  getAddress,
};
