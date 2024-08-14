const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Create a new food
router.post('/:restaurantId/foods', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    console.log(restaurant)
    restaurant.foodList.push(req.body);
    await restaurant.save();

    const newFood = restaurant.foodList[restaurant.foodList.length - 1];

    res.status(201).json(newFood);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});


// Get all foods
router.put('/:restaurantId/foods/:foodsId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    const food = restaurant.foodList.id(req.params.foodsId);
    food.name = req.body.name; 
    await restaurant.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Delete a food
router.delete('/:restaurantId/foods/:foodsId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    restaurant.foodList.remove({ _id: req.params.foodsId });
    await restaurant.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;