const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async function(req, res, next) {
  const db = req.app.locals.db;
  const users = await db.getAllUsers();
  res.send(users);
});

module.exports = router;



