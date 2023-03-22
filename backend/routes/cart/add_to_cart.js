// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');

router.post('/add_to_cart', async (req, res, next) => {
  // console.log(record);
  const { product_id } = req.body;
  const product_data = await product.find({ _id: product_id }).count();
  console.log(product_data);

  if (product_data) {
    const user_id = req.session.passport.user.id;
    if (cart.findOne({ customer_id: user_id })) {
      cart.updateOne({ customer_id: user_id }, {
        $push: {
          product_id: product_id
        }
      });
    } else {
      cart.create({
        product_id: product_id,
        customer_id: user_id
      });
    }


    return res.status(200).json({
      msg: "Successfully added.",
    });
  } else {
    return res.status(203).json({
      msg: "Error while loading!"
    });
  }
});

module.exports = router;