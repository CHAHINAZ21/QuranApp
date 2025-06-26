const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ PUT - Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, email, profileImage } = req.body;

    // Optionnel : Validation basique
    if (!firstname || !lastname || !email) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, profileImage },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
