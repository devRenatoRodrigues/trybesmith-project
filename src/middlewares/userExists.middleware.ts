import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserModel from '../database/models/user.model';

async function userExists(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { userId } = req.body;

  if (!userId) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: '"userId" is required' });
  }
  
  if (typeof userId !== 'number') {
    return res.status(mapStatusHTTP('UNPROCESSABLE_CONTENT'))
      .json({ message: '"userId" must be a number' });
  }
  const user = await UserModel.findByPk(userId);
  
  if (!user) {
    return res.status(mapStatusHTTP('NOT_FOUND'))
      .json({ message: '"userId" not found' });
  }

  next();
}
  
export default userExists;