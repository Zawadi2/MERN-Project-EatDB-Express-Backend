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

const Food = mongoose.model("Food", foodSchema);

module.exports = {Food, foodSchema}