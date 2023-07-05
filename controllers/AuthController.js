const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

class AuthController {
  static async createToken(payload, res) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
    return token;
  }

  static async verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}

module.exports = AuthController;
