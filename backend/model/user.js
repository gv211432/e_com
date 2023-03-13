// creating schema of the users collection
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  profile_pic_url: String,
  location: String,
  date_of_birth: String,
}, { timestamps: true });

// finally making model of it
const user = mongoose.model("user", userSchema);
module.exports = user;