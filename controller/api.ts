import { Request, Response, NextFunction } from 'express';
import firebase from '../config/firebaseConfig';
import User from '../entities/user';
import { getFirestore, collection, doc, addDoc, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase);

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'USERS'), data);
    res.status(200).send('New user created successfully')
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getDocs(collection(db, 'USERS'));

    if (users.empty) {
      res.status(404).send('No users found');
    } else {
      // const user = new User(
      //   doc.id,
      //   doc.data().username,
      //   doc.data().email,
      //   doc.data().password
      // );
      res.status(200).send(users);
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};