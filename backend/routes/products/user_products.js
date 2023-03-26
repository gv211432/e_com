// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.post('/product/user_products', async (req, res, next) => {
  // console.log(record);
  const user_id = req.session.passport.user.id;

  const product_data = await product.find({
    createdByd: user_id
  });
  console.log(product_data);

  if (product_data) {
    return res.status(200).json({
      msg: "Successfully fetched..",
      data: product_data,
    });
  } else {
    return res.status(203).json({
      msg: "Error while fetching!"
    });
  }
});

module.exports = router;