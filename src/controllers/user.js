const UserModel = require('../models/user');
const { hash, compare } = require('bcryptjs');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../utils/tokens');

const create = async (req, res) => {    
  try {
    const { email, password } = req.body;
    // 1. Check if the user exist
    let user = await UserModel.findOne({ email: email });
    if (user) 
      throw new Error('User already exist');
    // 2. If not user exist already, hash the password
    req.body.password = await hash(password, 10);
    // 3. Insert the user in "database"
    user = await UserModel.create(req.body);
    if (user) 
      res.status(201).send({ 
        msg: 'User Created' 
      });
    else
      throw new Error('Database error');
  } catch (err) {
    res.status(400).send({
      error: `${err.message}`,
    });
  }
}

const list = async (req, res) => {   
  try {
    const users = await UserModel.find();
    if (users) 
      res.send(users);
    else
      throw new Error('Database error');
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const show = async (req, res) => {  
  try {
    const user = await UserModel.findById(req.params.id);
    if (user)
      res.send(user);
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const update = async (req, res) => {    
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    if (user)
      res.send({ 
        msg: 'User Updated' 
      });
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const destroy = async (req, res) => {    
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (user)
      res.send('Deleted user ' + req.params.id);
    else
      throw new Error('Database error');
  } catch (error) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
}

const login = async (req, res) => {  
  try {
    const { email, password } = req.body;
    // 1. Find user in array. If not exist send error
    let user = await UserModel.findOne({ email: email });
    if (!user) 
      throw new Error('Incorrect email address or password');
    // 2. Compare crypted password and see if it checks out. Send error if not
    const valid = await compare(password, user.password);
    if (!valid) 
      throw new Error('Incorrect email address or password');
    // 3. Create Refresh- and Accesstoken
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user.id);

    // 4. Store Refreshtoken with user in "db"
    user = await UserModel.findByIdAndUpdate(user.id, { refreshToken: refreshToken });
    if (!user) 
      throw new Error('Database error');
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken);
  } catch (err) {
    res.status(400).send({
      error: `${err.message}`,
    });
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  login
};