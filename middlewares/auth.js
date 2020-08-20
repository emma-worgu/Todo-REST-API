const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth =(req, res, next) => {
  try {
    const token = req.header('auth-token');
    if(!token) {
      return res.status(401).send('Access denied');
    }
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!verify) {
      return res.status(401).send('Verification failed');
    }
    res.user = verified.id;
    next();
  } catch(err) {
    res.status(500).send('Server Error')
  }

};

module.exports = auth;