import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req: Request, res: Response): Promise<Response> {
  const loginAuth = req.body;
  const serviceResponse = await loginService.verifyLogin(loginAuth);
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}
  
export default {
  login,
};