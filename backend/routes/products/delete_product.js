// this route fetches the product details
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.post('/product/:id', async (req, res, next) => {
  // console.log(record);
  const product_data = await product.deleteOne({ _id: req.params.id });
  console.log(product_data);

  if (product_data) {
    return res.status(200).json({
      msg: "Successfully deleted..",
      data: product_data,
    });
  } else {
    return res.status(203).json({
      msg: "Error while deletion!"
    });
  }
});

module.exports = router;