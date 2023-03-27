// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');
const { default: mongoose } = require('mongoose');

router.post('/cart/count', async (req, res, next) => {
  // console.log(record);
  const user_id = req.session.passport.user.id;
  const products_count = await cart.find({ customer_id: user_id });
  const res_data = {
    msg: "Success",
    products_count: products_count[0]?.product_id?.length,
  };
  return res.status(200).json(res_data);
});

module.exports = router;