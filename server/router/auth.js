const express = require('express');
const router = express.Router();
const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// @router POST api/auth/register
// @description register user
// @access Public

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });
  } else {
    try {
      //check for existing user
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Username already taken' });
      } else {
        // All good
        const hasPassword = await argon2.hash(password);
        const newUser = await User({ username, password: hasPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
          { userID: newUser._id },
          process.env.ACCESS_TOKEN,
          { expiresIn: '120s' }
        );
        res.json({
          success: true,
          message: 'User created successfully',
          accessToken,
          expiresIn: 30,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error', error });
    }
  }
});

// @router POST api/auth/login
// @description Login user
// @access Public

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' });
  } else {
    try {
      // check for existing user
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect Username or password' });
      } else {
        // User found
        const passwordHash = argon2.verify(existingUser.password, password);
        if (!passwordHash) {
          return res
            .status(400)
            .json({ success: false, message: 'Password Incorrect' });
        } else {
          // Return token
          const accessToken = jwt.sign(
            { userID: existingUser._id },
            process.env.ACCESS_TOKEN,
            { expiresIn: '60s' }
          );
          res.json({
            success: true,
            message: 'User login successfully',
            accessToken,
            expiresIn: 30,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error', error });
    }
  }
});

module.exports = router;
