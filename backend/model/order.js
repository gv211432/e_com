// creating schema of the users collection
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_id: { type: mongoose.Types.ObjectId, require: true, $ref: "prdducts" },
  customer_id: { type: mongoose.Types.ObjectId, require: true, $ref: "users" },
  payment_type: String,
  number_of_item: Number,
  total_amount: Number,
  address: String,
}, { timestamps: true });

// finally making model of it
const order = mongoose.model("order", productSchema);
module.exports = order;