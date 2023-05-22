import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import users from '../models/users';
import loginInterface from '../interface/loginInterface';
import { token } from '../uteis/token';

export default class loginService {
  static async login(email: string, password: string): Promise<loginInterface> {
    if (!email || !password) return { status: 400, message: 'All fields must be filled' };
    const validEmail = email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
    if (!validEmail || password.length < 6) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const loginUser = await users.findOne({ where: { email } });
    if (!loginUser || !bcrypt.compareSync(password, loginUser.password)) {
      return { status: 401, message: 'Invalid email or password' };
    }

    return { status: 200, token: token(loginUser.email) };
  }

  static async getByRole(authorization: string): Promise<loginInterface> {
    const email = jwt.decode(authorization);
    if (!email) throw new (Error)();
    const user = await users.findOne({ where: { email } });
    if (!user) return { status: 401, role: { message: 'User not found' } };
    return { status: 200, role: { role: user.role } };
  }
}
