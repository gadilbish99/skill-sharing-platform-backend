const express = require('express');
const router = express.Router();
const checkBody = require('../middleware/checkBody');
const userController = require('../controllers/user');

router.post('/register', checkBody, userController.create);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.post('/login', userController.login);

module.exports = router;



