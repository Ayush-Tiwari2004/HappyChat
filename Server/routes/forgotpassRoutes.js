const router = require('express').Router();
const { resetPassword, verifyOTP, changePassword } = require('../controllers/resetPassword');

router.post('/reset-password', resetPassword);
router.post('/verifyOTP', verifyOTP);
router.post('/change-password', changePassword);

module.exports = router;