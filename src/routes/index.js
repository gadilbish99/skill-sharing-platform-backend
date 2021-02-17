const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const postRouter = require('./post');
const postsRouter = require('./posts');
const uploadRouter = require('./upload');
const userRouter = require('./user');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/posts', postsRouter);
router.use('/upload', uploadRouter);
router.use('/user', userRouter);
router.use('/users', usersRouter);

module.exports = router;



