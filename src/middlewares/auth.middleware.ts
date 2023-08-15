import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' });
  }

  try {
    const decoded = jwt.verify(authorization) as User;
    const host = await UserModel.findOne({ where: { username: decoded.username } });
    if (!host) return res.status(401).json({ message: 'Token inválido' });

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;