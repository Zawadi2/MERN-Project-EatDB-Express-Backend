const mongoose = require("mongoose");
const {foodSchema }= require('./food');

const restaurantSchema = new mongoose.Schema({
   name: {
    type:String,
    required: true,
   },
   category: String,
   rating: Number,
   review:String,
   foodList:[foodSchema]
}); 
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = {Restaurant, restaurantSchema}