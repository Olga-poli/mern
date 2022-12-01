const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('../config/default.json');
const router = Router();
const {
  AppError,
  ValidationError,
  UserAlreadyExistError,
  UserNotFoundError,
  WrongPasswordError,
} = require('../models/errors/AppError');

// /api/auth/register
router.post('/register',
  [
    check('email', 'Must be email').isEmail,
    check('password', 'Must be longer then 1 symbol').isLength({ min: 1 }),
  ],
  async (request, response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError(validationErrors);
    }

    const {email, password} = request.body;
    const candidate = await User.findOne({ email: email });

    if (candidate) {
      throw new UserAlreadyExistError();
    }

    const hashedPassword = await bcrypt.hash(password);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return response.status(201).json({ message: 'User successfully created' });

  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.code).json({ ...error });
    } else {
      response.status(500).json({message: 'Something gone wrong, try again' })
    }
  }
});

// /api/auth/login
router.post('/login',
  [
    check('email', 'Must be email').normalizeEmail().isEmail,
    check('password', 'Enter password').exists(),
  ],
  async (request, response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError(validationErrors);
    }

    const {email, password} = request.body;
    const user = User.findOne({ email });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new WrongPasswordError();
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get('secretKey'),
      { expiresIn: '1h' }
    );

    return response.json({ token, userId: user.id });

  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.code).json({ ...error });
    } else {
      return response.status(500).json({message: 'Something gone wrong, try again'});
    }
  }
});

module.exports = router;
