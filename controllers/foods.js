const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Create a new food
router.post('/', async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json({ message: 'Food created successfully', newFood });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ foods });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


// Get a single food by ID
router.get('/:foodId', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
      res.status(404).json({ message: 'Food not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


// Update a food
router.put('/:foodId', async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.foodId, req.body, { new: true });
      res.status(200).json({ message: 'Food updated successfully', updatedFood });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


// Delete a food
router.delete('/:foodId', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.foodId);
      res.status(200).json({ message: 'Food deleted successfully', deletedFood });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;