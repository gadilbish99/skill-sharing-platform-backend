var express = require('express');
var router = express.Router();

router.post('/', async function(req, res, next) {
  const db = req.app.locals.db;
  const post = await db.addPost(req.body);
  res.send('Submitted' + post);
});

router.get('/:id', async function(req, res, next) {
  const db = req.app.locals.db;
  const post = await db.findPostByID(req.params.id);
  res.send(post);
});

module.exports = router;
