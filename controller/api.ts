import { Request, Response, NextFunction } from 'express';
import firebase from '../config/firebaseConfig';
import User from '../entities/user';
import admin from 'firebase-admin';
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

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