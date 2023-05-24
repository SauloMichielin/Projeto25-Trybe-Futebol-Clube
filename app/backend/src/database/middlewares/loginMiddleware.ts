import { NextFunction, Request, Response } from 'express';
import { verificaLogin } from '../uteis/schema';
import loginService from '../service/loginService';

const VerificaLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const error = verificaLogin(email, password);
  if (error.type) return res.status(error.type).json({ message: error.message });
  const { type, message } = await loginService.login(email, password);
  if (type) return res.status(type).json({ message });
  next();
};

export default VerificaLogin;
