import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies)
  const idToken = req.cookies?.access_token;
  if (idToken) {
    next();
  } else {
    res.status(401).send('User not signed in');
  }
};