const express = require('express')
const router = express.Router()
const User = require('../models/user')


// Creat a new restaurant
router.post('/', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a single User by ID
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'Track not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//update a specific User
router.put('/:userId', async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        password: req.body.password,
        restaurant: req.body.restaurant
      }
    }) 
    res.json({ message: "Successfully updated user.", userUpdated });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//delete 
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser= await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'Successfully deleted user.', deletedUser})
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

module.exports = router;
