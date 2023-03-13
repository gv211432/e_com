// this route handles the new user registration request.
const express = require('express');
const router = express.Router();
const product = require('../../model/product');

router.post('/product/edit_product', async (req, res, next) => {
  const {
    product_id,
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

  const result = await product.findOne({ _id: product_id });

  if (result && user_id === result.createdBy) {

    result.name = name;
    result.is_varified = is_varified;
    result.all_img_url = all_img_url;
    result.sub_description = sub_description;
    result.description = description;
    result.tags = tags;
    result.rating = rating;
    result.createdBy = user_id;
    result.price = price;
    result.mrp = mrp;
    result.company_name = company_name;
    result.in_stock_count = in_stock_count;
    result.category = category;

    result.save();

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
