const { verify } = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('You need to login.');
    // Based on 'Bearer ksfljrewori384328289398432'
    const token = authorization.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (userId) {
      req.userId = userId
      next();
    }
    else 
      throw new Error('Undefined user');
  } catch (err) {
    res.status(401).send({
      error: `${err.message}`,
    });
  }
};

module.exports = auth