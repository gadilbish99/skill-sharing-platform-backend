const express = require('express');
const router = express.Router();
const { isAuth } = require('../src/isAuth');

router.post('/', async function(req, res) {  
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const db = req.app.locals.db;
      const post = await db.addPost(req.body);
      res.send({
        msg: 'Submitted Post ' + post.id
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

router.get('/:id', async function(req, res) {
  const db = req.app.locals.db;
  const post = await db.findPostByID(req.params.id);
  res.send(post);
});

router.delete('/:id', async function(req, res) {
  const db = req.app.locals.db;
  const post = await db.deletePostByID(req.params.id);
  res.send('Deleted Post ' + req.params.id);
});


module.exports = router;
