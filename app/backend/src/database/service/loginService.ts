import * as bcrypt from 'bcryptjs';
import users from '../models/users';

type userInterface = {
  type: number | null,
  message: string
};

export default class loginService {
  public static async login(email: string, password: string): Promise<userInterface> {
    const user = await users.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return {
        type: 401, message: 'Invalid email or password' };
    }
    return { type: null, message: '' };
  }

  static async getByRole(email: string): Promise<userInterface | undefined> {
    const user = await users.findOne({ where: { email } });
    if (user) return user.dataValues.role;
  }
}
