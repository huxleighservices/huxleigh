
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
  writeBatch,
  orderBy,
  limit,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { UserProfile, TimePunch } from '@/types/auth';
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

export async function deleteHyperlink(hyperlinkId: string): Promise<void> {
    if (!hyperlinkId) {
        throw new Error('Hyperlink ID is required.');
    }
    const hyperlinkRef = doc(db, 'hyperlinks', hyperlinkId);
    try {
        await deleteDoc(hyperlinkRef);
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: hyperlinkRef.path,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}

// =================================================================
// Time Punch Functions
// =================================================================
export const createTimePunch = async (userId: string, type: 'in' | 'out'): Promise<void> => {
  const punchesRef = collection(db, 'users', userId, 'timePunches');
  const weekId = `${new Date().getFullYear()}-W${getWeekNumber(new Date())}`;

  const newPunch = {
    userId,
    type,
    timestamp: serverTimestamp(),
    weekId,
  };

  try {
    await addDoc(punchesRef, newPunch);
  } catch (serverError) {
    const permissionError = new FirestorePermissionError({
      path: punchesRef.path,
      operation: 'create',
      requestResourceData: newPunch,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw permissionError;
  }
};

export const deleteTimePunches = async (userId: string, punchIds: string[]): Promise<void> => {
    const batch = writeBatch(db);
    punchIds.forEach(punchId => {
        const punchRef = doc(db, 'users', userId, 'timePunches', punchId);
        batch.delete(punchRef);
    });

    try {
        await batch.commit();
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: `/users/${userId}/timePunches`,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
};

export const getLastPunch = async (userId: string): Promise<TimePunch | null> => {
  const punchesRef = collection(db, 'users', userId, 'timePunches');
  const q = query(punchesRef, orderBy('timestamp', 'desc'), limit(1));
  
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const lastDoc = querySnapshot.docs[0];
    return { id: lastDoc.id, ...lastDoc.data() } as TimePunch;
  } catch (serverError) {
      const permissionError = new FirestorePermissionError({
          path: punchesRef.path,
          operation: 'list',
      });
      errorEmitter.emit('permission-error', permissionError);
      return null;
  }
};

// Helper to get ISO week number
const getWeekNumber = (d: Date) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
  return weekNo;
};
