// this route handles the new user registration request.
const express = require('express');
const router = express.Router();
const user = require('../../model/user');
const bcrypt = require('bcryptjs');

router.post('/auth/register', async (req, res, next) => {
  const {
    name,
    email,
    password,
    address
  } = req.body;

  // making sure all required data is valid before creating a user
  if (!name || !email || !password || !address) {
    return res.status(203).json({
      msg: "First Name, email and password required."
    });
  }
  if (await user.findOne({ email: email })) {
    return res.status(203).json({
      msg: "User alread exist!!"
    });
  }
  // generating salt and hash for given password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const record = {
    name,
    address,
    email,
    username: email,
    password: hash,
  };

  // console.log(record);
  const result = await user.create(record);
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