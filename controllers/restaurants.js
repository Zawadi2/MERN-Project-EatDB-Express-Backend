const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Restaurant = require('../models/restaurant');
const router = express.Router();

router.use(verifyToken);

// Create a new restaurant

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    req.body.author = req.user._id;
    const restaurant = await Restaurant.create(req.body);
    console.log('Created restaurant:', restaurant);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get all restaurants

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate('author').sort({ createdAt: 'desc' });
    console.log('Query results:', restaurants);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json(error);
  }
});

// Get a single restaurant by ID
router.get('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).populate('author');
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a restaurant
router.put('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    console.log(restaurant)
    if (!restaurant.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true }
    );
    updatedRestaurant._doc.author = req.user;
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// Delete a restaurant
router.delete('/:restaurantId', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
    console.log(deletedRestaurant)
      res.status(200).json({ message: 'Restaurant deleted successfully', deletedRestaurant });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

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


module.exports = router;