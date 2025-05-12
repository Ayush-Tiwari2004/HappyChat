const { sendMessage, getMessage, getLastMessages } = require('../controllers/messageControllers');
const authMiddleware = require('../middlewhere/authMiddlewere');
const router = require('express').Router();

router.post('/send/:id',authMiddleware, sendMessage);
router.get('/:id',authMiddleware, getMessage);
router.get('/last-messages/:userId',authMiddleware, getLastMessages);

module.exports = router;