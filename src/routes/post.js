const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/post');

router.post('/', auth, postController.create);
router.get('/:id', postController.show);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);

module.exports = router;
