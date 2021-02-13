const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth,  async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    const posts = await db.getAllPosts();
    if (!posts) throw new Error('Database error');
    res.send(posts);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

module.exports = router;