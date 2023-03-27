// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');
const ObjectId = require('mongoose').mongo.ObjectId;

router.post('/cart/remove_from_cart', async (req, res, next) => {
  // console.log(record);
  const { product_id } = req.body;
  console.log({ product_id });
  const product_data = product_id ? await product.find({ _id: product_id }).count() : null;
  console.log({ product_data });

  if (product_data && product_id) {
    const p_id = await ObjectId(product_id);
    const user_id = req.session.passport.user.id;
    if (await cart.findOne({ customer_id: user_id })) {
      const result = await cart.updateOne({ customer_id: user_id }, {
        $pull: {
          product_id: p_id
        }
      });
    }
    return res.status(200).json({
      msg: "Successfully removed.",
    });
  } else {
    return res.status(203).json({
      msg: "Error while loading!"
    });
  }
});

module.exports = router;