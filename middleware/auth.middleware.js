const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      return response.status(401).json({message: 'Not authorized'});
    }

    request.user = jwt.verify(token, config.secretKey);
    next();

  } catch (error) {
    return response.status(401).json({message: 'Not authorized'});
  }
};
