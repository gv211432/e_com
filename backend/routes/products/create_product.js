// this route handles the new user registration request.
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.post('/product/create', async (req, res, next) => {
  const {
    name,
    sub_description,
    description,
    tags,
    rating,
    price,
    mrp,
    is_varified,
    all_img_url,
    company_name,
    in_stock_count,
    category
  } = req.body;

  const user_id = req.session.passport.user.id;

  const record = {
    name: name,
    is_varified: is_varified,
    all_img_url: all_img_url,
    sub_description: sub_description,
    description: description,
    tags: tags,
    rating: rating,
    createdBy: user_id,
    price: price,
    mrp: mrp,
    company_name: company_name,
    in_stock_count: in_stock_count,
    category: category,
  };
  console.log(record);

  const result = await product.create(record);
  console.log(result);

  if (result) {
    return res.status(200).json({
      msg: "Successfully inserted.."
    });
  } else {
    return res.status(203).json({
      msg: "Error in insertion!"
    });
  }
});

module.exports = router;