import { Request, Response } from 'express';
import loginService from '../service/loginService';

export default class loginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message, token } = await loginService.login(email, password);
    if (status !== 200) {
      return res.status(status).json({ message });
    }
    return res.status(status).json({ token });
  }

  static async getByRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) throw new (Error)();
    const response = await loginService.getByRole(authorization);
    if (response.status !== 200) {
      return res.status(response.status).json({ message: response.message });
    }
    return res.status(response.status).json(response.role);
  }
}
