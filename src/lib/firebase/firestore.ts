
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
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { UserProfile } from '@/types/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

// =================================================================
// Hyperlink Functions
// =================================================================
export async function createHyperlink(creatorId: string, title: string, url: string): Promise<void> {
    if (!creatorId || !title || !url) {
        throw new Error('Creator ID, title, and URL are required.');
    }
    const hyperlinksRef = collection(db, 'hyperlinks');
    const newLinkData = {
        creatorId,
        title,
        url,
        createdAt: serverTimestamp(),
    };
    
    try {
      await addDoc(hyperlinksRef, newLinkData);
    } catch(serverError) {
        const permissionError = new FirestorePermissionError({
            path: hyperlinksRef.path,
            operation: 'create',
            requestResourceData: newLinkData,
        });
        errorEmitter.emit('permission-error', permissionError);
        // Re-throw the original error if needed, or a new one
        throw permissionError;
    }
}
