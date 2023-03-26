// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');
const cart = require('../../model/cart');
const { default: mongoose } = require('mongoose');

router.post('/cart/fetch_cart', async (req, res, next) => {
  // console.log(record);
  const user_id = req.session.passport.user.id;
  const product_data = await cart.aggregate([
    { $match: { customer_id: mongoose.Types.ObjectId(user_id) } },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product"
      }
    }
  ]);
  console.log(product_data);

  if (product_data) {
    return res.status(200).json({
      msg: "Successfully added.",
      data: product_data
    });
  } else {
    return res.status(203).json({
      msg: "Not found!!"
    });
  }
});

module.exports = router;