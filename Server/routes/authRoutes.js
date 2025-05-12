const router = require('express').Router();
const {signup, login, getOtherUsers,} = require('../controllers/authcontrollers');
const authMiddleware = require('../middlewhere/authMiddlewere');
const { signupValidation, loginValidation } = require('../middlewhere/authValidation');


router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/get-other-users', authMiddleware, getOtherUsers);

module.exports = router;