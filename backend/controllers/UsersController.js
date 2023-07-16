import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import sequelize from '../utils/db.js';
import User from '../models/user.js';
import AuthController from './AuthController.js';

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
    await body('email').notEmpty().isEmail().normalizeEmail().run(req);
    await body('password').notEmpty().run(req);

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const match = await comparePasswords(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const isAdmin = user.isAdmin;
      const payload = { admin: isAdmin, userId: user.id };
      const token = await AuthController.createToken(payload);
      res.cookie('token', token, { httpOnly: true, secure: true });

      console.log(token);
      return res.status(200).json(user.toJson());

    } catch (error) {
      console.log('error with user login', error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const id = req.user.userId;
      const user = await User.findByPk(id);

      return res.status(200).json(user.toJson());
    } catch (error) {
      console.log('user not found', error);
      return res.status(500).json({ error: 'user not found' });
    }
  }

  static async editUserProfile(req, res) {
    try {
      const id = req.user.userId;
      const user = await User.findByPk(id);

      const {
        firstName,
        lastName,
        email,
        phoneNumber
      } = req.body;

      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (email) {
        user.email = email;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      await user.save();
      res.status(200).json(user.toJson());

    } catch (error) {
      console.log('user not found', error)
      return res.status(500).json({ error: 'user not found' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.user.userId;
      const user = await User.findByPk(id);

      if (user) {
        user.destroy();
        res.status(200).send('User deleted successfully');
      } else {
        res.status(404).json({ error: 'User not found' });
      }

    } catch (error) {
      console.log('user not found', error);
      return res.status(500).json({ error: 'user not found' });
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

export default UsersController;
