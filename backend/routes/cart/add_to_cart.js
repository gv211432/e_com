// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');
const { default: mongoose } = require('mongoose');

router.post('/cart/add_to_cart', async (req, res, next) => {
  // console.log(record);
  const { product_id } = req.body;
  const product_data = await product.find({ _id: product_id }).count();
  console.log(product_data);

  if (product_data) {
    const user_id = req.session.passport.user.id;
    if (await cart.findOne({ customer_id: user_id })) {
      const result = await cart.updateOne({ customer_id: user_id }, {
        $push: {
          product_id: mongoose.Types.ObjectId(product_id)
        }
      });
      console.log("1 reslult:", result);

    } else {
      const result = await cart.create({
        product_id: mongoose.Types.ObjectId(product_id),
        customer_id: mongoose.Types.ObjectId(user_id)
      });
      console.log("2 reslult:", result);
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