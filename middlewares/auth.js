const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    //console.log(token);
    if(!token) {
      console.log('I am not token');
      return res.status(401).send('Access denied');
    }
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!verify) {
      return res.status(401).send('Verification failed');
    }
    console.log(verify)
    console.log(verify._id)
    req.user = verify._id;
    next();
  } catch(err) {
    res.status(500).send('Server Error')
    console.log(err);
  }

};

module.exports = auth;