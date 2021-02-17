const UserModel = require('../models/user');
const { verify } = require('jsonwebtoken');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../utils/tokens');

// Get a new access token with a refresh token
const createTokens = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    // If we don't have a token in our request
    if (!token) 
      throw new Error('No token');
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
    // token is valid, check if user exist
    let user = await UserModel.findById(payload.userId);
    if (!user) 
      throw new Error('User does not exist');
    // user exist, check if refreshtoken exist on user
    if (user.refreshToken !== token)
      throw new Error('Wrong refresh token');
    // token exist, create new Refresh- and accesstoken
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    user = await UserModel.findByIdAndUpdate(user.id, { refreshToken: refreshToken });
    if (!user) 
      throw new Error('Database error');
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  } catch (error) {
    return res.status(401).send({
      error: `${error.message}`,
    });
  }};

module.exports = {
  createTokens
}