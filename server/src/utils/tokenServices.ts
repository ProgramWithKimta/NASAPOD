import jwt from 'jsonwebtoken';
import 'dotenv/config'

// Add username property to Request object
declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

export function getUserFromToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    return decodedToken.data.username;
  } catch (err) {
    return undefined;
  }
};

export function generateToken(username: string, _id: unknown) {
  const payload = { username, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '1h' });
};
