const express = require('express')
const base64 = require('js-base64')
const { User } = require('../models')

const authRoutes = express()

const signup = async (req, res) => {
    const { username, password } = req.body;
    await User.createWithHashed(username, password);
    res.status(201).end();
};

const signin = async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization || !authorization.startsWith('Basic ')) {
        return next(new Error('Invalid authorization scheme'));
    }

    const decoded = base64.decode(authorization.replace('Basic ', ''));
    const [username, password] = decoded.split(':');
    const user = await User.findLoggedIn(username, password);

    return user
      ? res.status(200).send({ username: user.username })
      : next(new Error('Invalid login'));
};

authRoutes
  .use(express.json())
  .post('/signup', signup)
  .post('/signin', signin);

module.exports = { authRoutes };