import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase/auth';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    next();
  } else {
    res.status(401).send('User not signed in');
  }
};