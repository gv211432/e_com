// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');
const ObjectId = require('mongoose').mongo.ObjectId;

router.post('/cart/add_to_cart', async (req, res, next) => {
  // console.log(record);
  const { product_id } = req.body;
  console.log({ product_id });
  const product_data = product_id ? await product.find({ _id: product_id }).count() : null;
  console.log({ product_data });

  if (product_data && product_id) {
    const p_id = await ObjectId(product_id);
    console.log({ p_id });
    const user_id = req.session.passport.user.id;
    if (await cart.findOne({ customer_id: user_id })) {
      const result = await cart.updateOne({ customer_id: user_id }, {
        $push: {
          product_id: p_id
        }
      });
      console.log("1 reslult:", result);
    } else {
      const result = await cart.create({
        product_id: [p_id],
        customer_id: user_id
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