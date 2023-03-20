// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.get('/products', async (req, res, next) => {
  // console.log(record);
  const product_data = await product.find({}).lean();
  console.log(product_data);

  if (product_data) {
    return res.status(200).json({
      msg: "Successfully fetched.",
      data: product_data,
    });
  } else {
    return res.status(203).json({
      msg: "Error while loading!"
    });
  }
});

module.exports = router;