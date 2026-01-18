import { Request, Response, NextFunction } from 'express';
import { sendError } from '../libs/utils';
import { config } from '../config/constants'

export const apiMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['api-token'];
  const validKey = config.API_KEY;

  if (!validKey) {
    return next();
  }

  if (!apiKey || apiKey !== validKey) {
    return sendError(res, 'Unauthorized', null, 401);
  }

  next();
};
