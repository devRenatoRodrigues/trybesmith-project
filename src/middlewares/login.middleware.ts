import { NextFunction, Request, Response } from 'express';

async function loginMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { login } = req.body;

  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
      
  next();
}
  
export default loginMiddleware;