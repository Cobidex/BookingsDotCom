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
    const { firstName, lastName, email, password, phoneNumber, isAdmin } = req.body;
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

    const newUser = {
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber,
      isAdmin
    };

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
      return res.status(501).json({ error: 'Internal Server error' });
    }
  }

  static async getUserProfile(req, res) {
    const { id } = req.params;
    const admin = req.user.admin;

    try {
      if (admin || id === req.user.userId) {
        const user = await User.findByPk(id);

        return res.status(200).json({
          id,
          name: user.getName(),
          email: user.email,
          phone: user.phoneNumber,
          isAdmin: user.isAdmin,
        });
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }

    } catch (error) {
      console.log('error getting user profile details', error);
      return res.status(501).json({ error: 'internal server error' });
    }
  }

  static async putUser(req, res) {
    const { id } = req.params;
    const admin = req.user.admin;
    try {
      if (admin || id === req.user.userId) {
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
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }

    } catch (error) {
      console.log('error updating user details', error)
      return res.status(501).json({ error: 'internal server error' });
    }
  }

  static async deleteUser(req, res) {
    const admin = req.user.admin;
    const { id } = req.params;
    try {
      if (admin || id === req.user.userId) {
        await User.destroy({
          where: { id }
        });

        return res.status(200).send('User deleted successfully');
      } else {
        return res.status(401).send({ error: 'Unauthorized' });
      }

    } catch (error) {
      console.log('error deleting user', error);
      return res.status(501).json({ error: 'internal server error' });
    }
  }
}

module.exports = UsersController;
