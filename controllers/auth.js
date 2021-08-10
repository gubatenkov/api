const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { CREATED } = StatusCodes;

const register = async (req, res) => {
  // create new user in DB with provided credentials
  const user = await User.create({
    ...req.body,
  });
  const { _id, name } = user;

  // generate JWT-token, then send it to the client
  const token = user.generateToken();

  // response to client with message and token
  res
    .status(CREATED)
    .json({ message: 'user registered', user: { name, _id, token } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // validate client credentials
  if (!email || !password) {
    throw new BadRequestError('please, provide credentials to login');
  }
  // does user already exist in DB ?
  const user = await User.findOne({ email });
  // if not, throw error
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }
  // if so, compare client pass and pass from DB
  const isPasswordsMatch = await user.comparePasswords(password);
  if (!isPasswordsMatch) {
    throw new UnauthenticatedError('invalid credentials');
  }
  // then generate token for logined user
  const token = user.generateToken();
  // finally, send response to the client
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
