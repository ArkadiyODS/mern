const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const {
  HttpServerError,
  HttpBadRequest,
  HttpCreated,
} = require('./httpResponses');

const router = Router();
const saltRounds = 10;
const minPasswordLength = 6;

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check(
      'password',
      `Password length shouldn\'t be less than ${minPasswordLength} symbols`
    ).isLength({ min: minPasswordLength }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HttpBadRequest)
          .json({ errors: errors.array(), message: 'Incorrect data format' });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(HttpBadRequest)
          .json({ message: 'User with such email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(String(password), saltRounds);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(HttpCreated).json({ ...user.toJSON(), password: '*****' });
    } catch (err) {
      console.error(err);
      res
        .status(HttpServerError)
        .json({ message: 'Something went wrong. Please try again.' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', `Enter password`).exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(HttpBadRequest)
          .json({ errors: errors.array(), message: 'Incorrect data format' });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(HttpBadRequest).json({
          message: "User doesn't exist or password doesn't match with email",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        String(password),
        user.password
      );

      if (!isPasswordMatch) {
        return res.status(HttpBadRequest).json({
          message: "User doesn't exist or password doesn't match with email",
        });
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '1h',
      });

      res.json({ token, userId: user.id });
    } catch (err) {
      console.error(err);
      res
        .status(HttpServerError)
        .json({ message: 'Something went wrong. Please try again.' });
    }
  }
);
module.exports = router;
