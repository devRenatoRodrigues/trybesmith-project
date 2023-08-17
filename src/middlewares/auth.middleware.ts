import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';
import barerExtract from '../utils/barerExtract';

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  const validToken = barerExtract(authorization);

  try {
    const decoded = jwt.verify(validToken) as User;
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;