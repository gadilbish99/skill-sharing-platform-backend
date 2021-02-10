const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const db = req.app.locals.db;
  const posts = await db.getAllPosts();
  res.send(posts);
});

module.exports = router;