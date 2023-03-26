// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.post('/product/some_product', async (req, res, next) => {
  // console.log(record);
  const { product_ids } = req.body;
  const product_data = await product.find({
    _id: { $in: product_ids }
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