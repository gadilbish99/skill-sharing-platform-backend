const express = require('express');
const router = express.Router();
const Database = require('../src/database');
const db = new Database();

router.get('/', async function(req, res, next) {
  const posts = await db.getAllPosts();
  res.send(posts);
});

module.exports = router;



