
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
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { UserProfile, TrainingSession, TrainingResult } from '@/types/auth';
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
// B2B Trainer (Tr/AI/ner) Functions
// =================================================================

export const onSessionsUpdate = (userId: string, callback: (sessions: TrainingSession[]) => void) => {
    const sessionsRef = collection(db, 'users', userId, 'trainingSessions');
    const q = query(sessionsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const sessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrainingSession));
        callback(sessions);
    }, (error) => {
        console.error("Error listening to session updates: ", error);
        const permissionError = new FirestorePermissionError({
            path: `users/${userId}/trainingSessions`,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
    });

    return unsubscribe;
};

export const addTrainingSession = async (userId: string, name: string): Promise<string> => {
    const sessionsRef = collection(db, 'users', userId, 'trainingSessions');
    const newSession = {
        userId,
        name,
        createdAt: serverTimestamp(),
        results: [],
    };
    try {
        const docRef = await addDoc(sessionsRef, newSession);
        return docRef.id;
    } catch(serverError) {
        const permissionError = new FirestorePermissionError({
            path: sessionsRef.path,
            operation: 'create',
            requestResourceData: newSession,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
};

export const deleteTrainingSession = async (userId: string, sessionId: string): Promise<void> => {
    const sessionRef = doc(db, 'users', userId, 'trainingSessions', sessionId);
    try {
        await deleteDoc(sessionRef);
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: sessionRef.path,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
};

export const addResultToSession = async (userId: string, sessionId: string, result: Omit<TrainingResult, 'id' | 'completedAt'>): Promise<void> => {
    const sessionRef = doc(db, 'users', userId, 'trainingSessions', sessionId);
    const newResult = {
        ...result,
        id: uuidv4(),
        completedAt: serverTimestamp()
    };
     try {
        await updateDoc(sessionRef, {
            results: arrayUnion(newResult)
        });
    } catch (serverError) {
         const permissionError = new FirestorePermissionError({
            path: sessionRef.path,
            operation: 'update',
            requestResourceData: { results: [newResult] },
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
};

export const deleteResultFromSession = async (userId: string, sessionId: string, resultId: string): Promise<void> => {
    const sessionRef = doc(db, 'users', userId, 'trainingSessions', sessionId);
    try {
        const sessionDoc = await getDoc(sessionRef);
        if (sessionDoc.exists()) {
            const sessionData = sessionDoc.data() as TrainingSession;
            const resultToRemove = sessionData.results.find(r => r.id === resultId);
            if (resultToRemove) {
                await updateDoc(sessionRef, {
                    results: arrayRemove(resultToRemove)
                });
            }
        }
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: sessionRef.path,
            operation: 'update',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
};
