const express = require('express');
const router = express.Router();
const { getOtherUsers } = require('../controllers/authcontrollers');
const { protect } = require('../middleware/authMiddleware');

// Get other users
router.get('/get-other-users', protect, getOtherUsers);

module.exports = router; 