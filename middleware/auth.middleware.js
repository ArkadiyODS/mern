const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const { HttpUnauthorized } = require('../routes/httpResponses');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const athorizationHeader = req.headers.athorization;
    if (!athorizationHeader) {
      throw new Error('Not authorized request');
    }
    const token = athorizationHeader.slice(7);
    console.log(token);
    const { userId } = jwt.verify(token, config.jwtSecret);
    req.userId = userId;
    next();
  } catch (err) {
    console.log('Error: ', err.message);
    res.status(HttpUnauthorized).json({ message: 'Not authorized request' });
  }
};
