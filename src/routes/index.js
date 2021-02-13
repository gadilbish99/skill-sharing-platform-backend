const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const usersRouter = require('./users');
const uploadRouter = require('./upload');
const postRouter = require('./post');
const postsRouter = require('./posts');

router.use('/post', postRouter);
router.use('/posts', postsRouter);
router.use('/upload', uploadRouter);
router.use('/user', userRouter);
router.use('/users', usersRouter);

module.exports = router;



