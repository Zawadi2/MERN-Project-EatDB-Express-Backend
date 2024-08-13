const mongoose = require("mongoose");
const restaurantSchema = require('./restaurant');


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
  