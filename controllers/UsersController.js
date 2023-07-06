const bcrypt = require('bcrypt');
const User = require('../models/user');
const AuthController = require('./AuthController');
const sequelize = require('../utils/db');

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log('Error hashing password:', err);
    return null;
  }
}


async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

class UsersController {
  static async postNew(req, res) {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName) {
      return res.status(400).send({ error: 'Missing firstName' });
    }
    if (!lastName) {
      return res.status(400).send({ error: 'Missing lastName' });
    }
    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    if (!phoneNumber) {
      return res.status(400).send({ error: 'Missing phoneNumber' });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ error: 'Email Already exists' });
    }

    const hash = await hashPassword(password);
    if (!hash) {
      return res.status(501).send({ error: 'internal Server error' });
    }

    const newUser = { firstName, lastName, email, password: hash, phoneNumber };
    try {
      const createdUser = await User.create(newUser);
      return res.status(200).send({ Name: createdUser.getName(), id: createdUser.id });
    } catch (error) {
      console.log('error writing to database', error);
      return null
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    try {
      const match = await comparePasswords(Password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const payload = { email, userId: user.id };
      const token = AuthController.createToken(payload, res);
      return res.status(200).json({ id: user.id });
    } catch (error) {
      return res.status(501).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = UsersController;
