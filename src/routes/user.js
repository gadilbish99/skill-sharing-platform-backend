require('dotenv/config');
const express = require('express');
const router = express.Router();
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../utils/tokens');
const checkBody = require('../middleware/checkBody');

router.post('/register', checkBody, async function(req, res, next) {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  try {
    // 1. Check if the user exist
    let user = await db.findUser(email);
    if (user) throw new Error('User already exist');
    // 2. If not user exist already, hash the password
    req.body.password = await hash(password, 10);
    // 3. Insert the user in "database"
    user = await db.addUser(req.body);
    if (!user) throw new Error('Database error');
    res.status(201).send('User Created');
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

router.post('/login', async function(req, res, next) {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  try {
    // 1. Find user in array. If not exist send error
    let user = await db.findUser(email);
    if (!user) throw new Error('Incorrect email address or password');
    // 2. Compare crypted password and see if it checks out. Send error if not
    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Incorrect email address or password');
    // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user);
    const refreshtoken = createRefreshToken(user.id);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    user = await db.setToken(user.id, refreshtoken);
    if (!user) throw new Error('Database error');
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// Get a new access token with a refresh token
router.post('/refresh_token', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const token = req.cookies.refreshtoken;
    // If we don't have a token in our request
    if (!token) throw new Error('No token');
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
    // token is valid, check if user exist
    let user = await db.findUserByID(payload.userId);
    if (!user) throw new Error('User does not exist');
    // user exist, check if refreshtoken exist on user
    if (user.refresh_token !== token)
      throw new Error('Wrong refresh token');
    // token exist, create new Refresh- and accesstoken
    const accesstoken = createAccessToken(user);
    const refreshtoken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    user = await db.setToken(user.id, refreshtoken);
    if (!user) throw new Error('Database error');
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  } catch (error) {
    return res.status(401).send({
      error: `${error.message}`,
    });
  }
});

module.exports = router;



