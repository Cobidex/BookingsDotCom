import jwt from 'jsonwebtoken';

const secretKey = process.env.BDC_SECRET_KEY;

class AuthController {
  static async createToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  }

  static async verifyUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = await jwt.verify(token, secretKey);
      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  static async verifyAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = await jwt.verify(token, secretKey);
      const admin = decoded.admin;
      if (admin) {
        next();
      } else {
        return res.status(401).json({ error: 'You are not Admin' });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}

export default AuthController;
