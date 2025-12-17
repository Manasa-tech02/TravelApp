import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

/**
 * CREATE user profile (after signup)
 */
export const createUserProfile = async (
  uid: string,
  fullName: string,
  email: string
) => {
  await usersCollection.doc(uid).set({
    fullName,
    email,
    phone: '',
    location: '',
    address: '',
    pincode: '',
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

/**
 * GET user profile (one-time fetch)
 */
export const getUserProfile = async (uid: string) => {
  const doc = await usersCollection.doc(uid).get();

  if (!doc.exists) return null;

  return doc.data() as {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    address?: string;
    pincode?: string;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
  };
};

/**
 * LISTEN to user profile (real-time)
 */
export const listenToUserProfile = (
  uid: string,
  callback: (data: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    address?: string;
    pincode?: string;
  }) => void
) => {
  return usersCollection.doc(uid).onSnapshot(snapshot => {
    if (snapshot.exists()) {
      callback(snapshot.data() as any);
    }
  });
};

/**
 * UPDATE user profile
 */
export const updateUserProfile = async (
  uid: string,
  data: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    address?: string;
    pincode?: string;
  }
) => {
  await usersCollection.doc(uid).update({
    ...data,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

/**
 * DELETE user profile
 */
export const deleteUserProfile = async (uid: string) => {
  await usersCollection.doc(uid).delete();
};
