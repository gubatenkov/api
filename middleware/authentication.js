const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check auth header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid authorization');
  }
  // get token from header
  const token = authHeader.split(' ')[1];
  // try to verify token
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { user: { userId: payload.userId, name: payload.name } };
    next();
  } catch (error) {
    throw new UnauthenticatedError(error.message);
  }
};

module.exports = auth;
