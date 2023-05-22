import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'SauloToken';

const token = (email: string) => jwt.sign(email, SECRET_KEY);

const validate = (_req: Request, res: Response, next: NextFunction) => {
  const result = _req.headers.authorization;
  if (!result) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const validToken = jwt.verify(result, SECRET_KEY);
    if (validToken) return next();
  } catch (error: unknown) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { token, validate };
