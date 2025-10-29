
'use client';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { UserProfile } from '@/types/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { v4 as uuidv4 } from 'uuid';

const { firestore } = initializeFirebase();
const db = firestore;

// =================================================================
// User Profile Functions
// =================================================================

export async function getAllUsers(): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef);
  try {
    const querySnapshot = await getDocs(usersQuery);
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() } as UserProfile);
    });
    return users;
  } catch (serverError) {
      const permissionError = new FirestorePermissionError({
          path: usersRef.path,
          operation: 'list',
      });
      errorEmitter.emit('permission-error', permissionError);
      return [];
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userProfileRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userProfileRef);

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
  } else {
    return null;
  }
}

export async function createUserProfile(userId: string, data: Omit<Partial<UserProfile>, 'uid' | 'createdAt' | 'updatedAt'> & { email: string, displayName: string }): Promise<void> {
  const userProfileRef = doc(db, 'users', userId);
  const profileData = {
    ...data,
    uid: userId,
    displayName_lowercase: data.displayName.toLowerCase(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    role: data.email === 'z1mmerman@yahoo.com' ? 'admin' : 'user', // Set admin role
  };
  setDoc(userProfileRef, profileData)
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userProfileRef.path,
          operation: 'create',
          requestResourceData: profileData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
}


export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    const userProfileRef = doc(db, 'users', userId);
    const updateData = { ...data, updatedAt: serverTimestamp() };
    if (data.displayName) {
      (updateData as any).displayName_lowercase = data.displayName.toLowerCase();
    }
    updateDoc(userProfileRef, updateData)
     .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userProfileRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
}

export async function deleteUserProfile(userId: string): Promise<void> {
    const userProfileRef = doc(db, 'users', userId);
    await deleteDoc(userProfileRef);
}
