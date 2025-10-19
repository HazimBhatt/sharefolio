import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ;

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Invalid token');
  }
}