// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');

router.post('/fetch_cart', async (req, res, next) => {
  // console.log(record);
  const user_id = req.session.passport.user.id;

  const res = await cart.updateOne({ customer_id: user_id }, {
    product_id: []
  });

  if (res.modifiedCount) {
    return res.status(200).json({
      msg: "Successfully cleared.",
    });
  } else {
    return res.status(203).json({
      msg: "Unable to clear"
    });
  }
});

module.exports = router;