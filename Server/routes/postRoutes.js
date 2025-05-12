const router = require("express").Router();
const { createPost, showPost, updateActiveTime } = require('../controllers/postController');

router.post('/create-post', createPost)
router.get('/show-post', showPost)
router.post('/update-active-time', updateActiveTime)

module.exports = router;