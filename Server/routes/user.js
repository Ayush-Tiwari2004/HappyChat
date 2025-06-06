const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/get-users', async (req, res) => {
    try {
        const users = await User.find({}, 'username email profilePic'); // Only fetch necessary fields
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 