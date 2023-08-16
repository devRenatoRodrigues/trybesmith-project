import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserModel from '../database/models/user.model';

async function userExists(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { userId } = req.body;
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return res.status(mapStatusHTTP('NOT_FOUND'))
      .json({ message: '"userId" not found' });
  }

  next();
}
  
export default userExists;