const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const db = req.app.locals.db;
  const users = await db.getAllUsers();
  res.send(users);
});

module.exports = router;



