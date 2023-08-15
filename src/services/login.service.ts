import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwt from '../utils/jwt';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  const user = await UserModel.findOne({ where: { username: login.username } });
  
  if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { id, username } = user.dataValues;
  const token = jwt.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
}
  
export default {
  verifyLogin,
};