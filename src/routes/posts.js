const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/post');

router.get('/', auth, postController.list);

module.exports = router;