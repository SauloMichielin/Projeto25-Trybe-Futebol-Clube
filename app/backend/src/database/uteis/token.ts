import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const password = process.env.JWT_SECRET || 'SauloToken';

// criar token
const token = (user: string): string => {
  const createToken = jwt.sign(user, password);
  return createToken;
};

// decodificar token
const decode = (verToken: any) => jwt.verify(verToken, password);

// validar token
const validate = (req: Request, res: Response, next: NextFunction) => {
  const verToken = req.header('Authorization');
  if (!verToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const resultado = jwt.verify(verToken, password);
    if (resultado) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { token, validate, decode };
