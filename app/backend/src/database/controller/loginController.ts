import { Request, Response } from 'express';
import loginService from '../service/loginService';
import { decode, token } from '../uteis/token';

export default class loginController {
  public static async login(req: Request, res: Response) {
    const { email } = req.body;
    const createToken = token(email);
    return res.status(200).json({ token: createToken });
  }

  static async getByRole(req: Request, res: Response) {
    const verToken = req.header('Authorization');
    const email = decode(verToken);
    const busca = await loginService.getByRole(email.toString());
    return res.status(200).json({ role: busca });
  }
}
