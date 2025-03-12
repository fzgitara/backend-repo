import { Request, Response, NextFunction } from 'express';
import firebase from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebase);

export const isUserSignedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = auth.currentUser;
  if (user) {
    next();
  } else {
    res.status(401).send('User not signed in');
  }
};