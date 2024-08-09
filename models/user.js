const mongoose = require("mongoose");
const { restaurantSchema } = require('./restaurant');


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    restaurant: [restaurantSchema]
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
  