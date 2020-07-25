import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../config/jwt';
import { User, IUser } from '../models/User';

interface AuthRequest extends Request {
  user: IUser;
}

export async function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded: any = verify(token, JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
}
