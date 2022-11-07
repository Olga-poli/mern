// const { RESPONSE_MESSAGE } = require('../constants');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('../config/default.json');
const router = Router();

const RESPONSE_MESSAGE = {
  ERROR: {
    IS_EMAIL: 'Must be email',
    PASSWORD_LENGTH: 'Must be longer then 1 symbol',
    PASSWORD_EXIST: 'Enter password',
    INCORRECT_DATA: 'Incorrect input data',
    INCORRECT_PASSWORD: 'Incorrect password',
    USER_ALREADY_EXIST: 'Such user already exist',
    USER_DOESNT_EXIST: 'User doesn\t exist',
    SERVER_ERROR: 'Something gone wrong, try again',
  },
  SUCCESS: {
    USER_CREATED: 'User successfully created',
  }
};

// /api/auth/register
router.post('/register',
  [
    check('email', RESPONSE_MESSAGE.ERROR.IS_EMAIL).isEmail,
    check('password', RESPONSE_MESSAGE.ERROR.PASSWORD_LENGTH).isLength({ min: 1 }),
  ],
  async (request, response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({ errors: validationErrors.array(), message: RESPONSE_MESSAGE.ERROR.INCORRECT_DATA });
    }

    const {email, password} = request.body;
    const candidate = await User.findOne({ email: email });

    if (candidate) {
      return response.status(400).json({ message: RESPONSE_MESSAGE.ERROR.USER_ALREADY_EXIST });
    }

    const hashedPassword = await bcrypt.hash(password);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return response.status(201).json({ message: RESPONSE_MESSAGE.SUCCESS.USER_CREATED });

  } catch (error) {
    response.status(500).json({message: RESPONSE_MESSAGE.ERROR.SERVER_ERROR})
  }
});

// /api/auth/login
router.post('/login',
  [
    check('email', RESPONSE_MESSAGE.ERROR.IS_EMAIL).normalizeEmail().isEmail,
    check('password', RESPONSE_MESSAGE.ERROR.PASSWORD_EXIST).exists(),
  ],
  async (request, response) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({ errors: validationErrors.array(), message: RESPONSE_MESSAGE.ERROR.INCORRECT_DATA });
    }

    const {email, password} = request.body;
    const user = User.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: RESPONSE_MESSAGE.ERROR.USER_DOESNT_EXIST});
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: RESPONSE_MESSAGE.ERROR.INCORRECT_PASSWORD });
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get('secretKey'),
      { expiresIn: '1h' }
    );

    return response.json({ token, userId: user.id });

  } catch (error) {
    response.status(500).json({message: RESPONSE_MESSAGE.ERROR.SERVER_ERROR})
  }
});

module.exports = router;
