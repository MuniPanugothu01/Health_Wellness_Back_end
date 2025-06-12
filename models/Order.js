const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

})


const Order = mongoose.models.order || mongoose.model('order',orderSchema);
module.exports = {
    Order
}