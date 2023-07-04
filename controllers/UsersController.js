const bcrypt = require('bcrypt');
const User = require('../models/user');
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
}

module.exports = UsersController;
