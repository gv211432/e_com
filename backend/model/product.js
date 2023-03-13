// creating schema of the users collection
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  is_varified: Boolean,
  all_img_url: [{ type: String }],
  sub_description: String, // short description
  description: String, // long description
  tags: String,
  category: String,
  in_stock_count: Number,
  rating: Number,
  company_name: String,
  createdBy: mongoose.Types.ObjectId,
  price: Number,
  mrp: Number
}, { timestamps: true });

// finally making model of it
const product = mongoose.model("product", productSchema);
module.exports = product;