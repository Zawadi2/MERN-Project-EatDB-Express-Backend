const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const User = require('../models/user');
const router = express.Router();

router.use(verifyToken);

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    
    const user = User.findById(req.user._id)
    console.log(req.user._id)
    user.restaurant.push(req.body)
    await user.save()
    // const restaurant = await Restaurant.create(req.body);
    // restaurant._doc.author = req.user;
    res.status(201).json({ message: 'Restaurant created successfully', restaurant });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ restaurants });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get a single restaurant by ID
router.get('/:Id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
      res.status(404).json({ message: 'Restaurant not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update a restaurant
router.put('/:restaurantId', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, { new: true });
      res.status(200).json({ message: 'Restaurant updated successfully', updatedRestaurant });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Delete a restaurant
router.delete('/:restaurantId', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
      res.status(200).json({ message: 'Restaurant deleted successfully', deletedRestaurant });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


module.exports = router;