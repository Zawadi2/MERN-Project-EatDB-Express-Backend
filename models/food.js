const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
   name: {
    type:String,
    required: true,
   },
   ingredients: String,
   isVegan: String,
   rating:Number,
   price:String
});  

module.exports = foodSchema