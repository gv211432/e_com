// creating schema of the users collection
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_id: [mongoose.Types.ObjectId],
  customer_id: { type: mongoose.Types.ObjectId, require: true },
}, { timestamps: true });

// finally making model of it
const cart = mongoose.model("cart", productSchema);
module.exports = cart;