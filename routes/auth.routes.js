// const { RESPONSE_MESSAGE } = import('../constants');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

const RESPONSE_MESSAGE = {
  ERROR: {
    IS_EMAIL: 'Must be email',
    PASSWORD_LENGTH: 'Must be longer then 1 symbol',
    INCORRECT_DATA: 'Incorrect login data',
    USER_ALREADY_EXIST: 'Such user already exist',
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
router.post('/login', async (request, response) => {

});

module.exports = router;
