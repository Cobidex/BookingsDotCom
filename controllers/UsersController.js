const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
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
  static async signUp(req, res) {
    // Validate user inputs
    await body('firstName').notEmpty().trim().escape().run(req);
    await body('lastName').notEmpty().trim().escape().run(req);
    await body('email').notEmpty().isEmail().normalizeEmail().run(req);
    await body('password').notEmpty().isLength({ min: 8 }).run(req);
    await body('phoneNumber').notEmpty().isMobilePhone().run(req);

    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      isAdmin
    } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).send({ error: 'Email Already exists' });
      }

      const hash = await hashPassword(password);
      if (!hash) {
        return res.status(501).send({ error: 'internal Server error' });
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password: hash,
        phoneNumber,
        isAdmin
      };

      const createdUser = await User.create(newUser);
      return res.status(200).send({ Name: createdUser.getName(), id: createdUser.id });
    } catch (error) {
      console.log('error writing to database', error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  }

  static async signIn(req, res) {

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
    
      const match = await comparePasswords(Password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const admin = user.isAdmin;
      const payload = { admin, userId: user.id };
      const token = AuthController.createToken(payload, res);

      return res.status(200).json({ id: user.id });

    } catch (error) {
      console.log('error with user login', error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }

  static async getUserProfile(req, res) {
    const id = req.user.userId;
    try {
      const user = await User.findByPk(id);

      return res.status(200).json({
        id,
        name: user.getName(),
        email: user.email,
        phone: user.phoneNumber,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      console.log('error getting user profile details', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  static async editUserProfile(req, res) {
    const id = req.user.userId;

    try {
      const user = await User.findByPk(id);

      const updateField = {};
      Object.keys(req.body).forEach((key) => {
        if (req.body[key]) {
          updateFields[key] = req.body[key];
        }
      });

      const [rows, [updatedUser]] = await User.update(updateFields, {
        where: { id },
        returning: true,
        attributes: { exclude: ['password'] }
      });

      return res.status(200).json({ updatedUser });

    } catch (error) {
      console.log('error updating user details', error)
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  static async deleteUser(req, res) {
    const id = req.user.userId;
    try {
      await User.destroy({
        where: { id }
      });

      return res.status(200).send('User deleted successfully');

    } catch (error) {
      console.log('error deleting user', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  static async getUserCount(req, res) {
    try {
      const count = await User.count();
      res.json({ count });
    } catch (error) {
      console.log('error retrieving user count', error);
      res.status(500).json({ error: 'internal server error' });
    }
  }
}

module.exports = UsersController;
