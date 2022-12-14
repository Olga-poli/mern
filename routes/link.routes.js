const { Router } = require('express');
const { nanoid } = require('nanoid');
const auth = require('../middleware/auth.middleware');
const config = require('../config/default.json');
const Link = require('../models/Link');
const { AppError } = require('../models/errors/AppError');
const router = Router();

// /api/link/generate
router.post('/generate', auth, async (request, response) => {
  try {
    const { baseUrl } = config;
    const { from } = request.body;
    const code = nanoid();
    const existing = await Link.findOne({ from });

    if (existing) {
      return response.json({ link: existing });
    }

    const link = new Link({
      code,
      to: `${baseUrl}/t/${code}`,
      from,
      owner: request.user.userId
    });
    await link.save();

    return response.status(201).json({ message: 'Successfully created'});

  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.code).json({ ...error });
    } else {
      return response.status(500).json({message: 'Something went wrong, try again' })
    }
  }
});

// /api/link/
router.get('/', auth, async (request, response) => {
  try {
    const links = await Link.find({ owner: request.user.userId });

    return response.json({ links });
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.code).json({ ...error });
    } else {
      return response.status(500).json({message: 'Something went wrong, try again' })
    }
  }
});

// /api/link/:id
router.get('/:id', async (request, response) => {
  try {
    const link = await Link.find(request.params.id);

    return response.json({ link });
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.code).json({ ...error });
    } else {
      return response.status(500).json({message: 'Something went wrong, try again' })
    }
  }
});

module.exports = router;
