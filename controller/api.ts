import { Request, Response } from 'express';
import firebase from '../config/firebaseConfig';
import User from '../entities/user';

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const db = getFirestore(firebase);
const auth = getAuth(firebase);

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
    const allUsers = await getDocs(collection(db, 'USERS'));
    const usersArray: object[] = [];

    if (allUsers.empty) {
      res.status(404).send('No users found');
    } else {
      allUsers.forEach(data => {
        const user = new User(
          data.id,
          data.data().username,
          data.data().totalAverageWeightRatings,
          data.data().numberOfRents,
          data.data().recentlyActive
        );
        usersArray.push(user);
      })
      res.status(200).send(usersArray);
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const fetchUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = doc(db, 'USERS', id);
    const userData = await getDoc(user);

    if (userData.exists()) {
      res.status(200).send(userData.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = doc(db, 'USERS', id);
    await updateDoc(user, data);

    res.status(200).send('User updated successfully');
    } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    res.status(200).send('Register success');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userCredential: any = await signInWithEmailAndPassword(auth, email, password);
    const idToken = userCredential._tokenResponse.idToken;
    if (idToken) {
      res.cookie('access_token', idToken, { httpOnly: true })
      console.log(req.cookies)
      res.status(200).send('Login success');
    } else {
      res.status(500).send('Internal server error');
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await signOut(auth);
    res.clearCookie('access_token');
    res.status(200).send('Logout success');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
