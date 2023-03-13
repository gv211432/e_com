// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.get('/product/:id', async (req, res, next) => {
  // console.log(record);
  const product_data = await product.findOne({ _id: req.params.id });
  console.log(product_data);

  if (product_data) {
    return res.status(200).json({
      msg: "Successfully inserted..",
      data: product_data,
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;