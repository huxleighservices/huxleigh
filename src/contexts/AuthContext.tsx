'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as updateAuthProfile,
  deleteUser,
  type User,
  type AuthError
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase'; 
import { useRouter } from 'next/navigation';
import type { SignInFormData, UserProfile, AuthProfileUpdateData, SignUpFormData } from '@/types/auth';
import { 
  getUserProfile, 
  updateUserProfile as updateDbUserProfile,
  createUserProfile,
  deleteUserProfile,
} from '@/lib/firebase/firestore';


interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (data: SignInFormData) => Promise<User | AuthError>;
  signUpWithEmail: (data: SignUpFormData) => Promise<User | AuthError>;
  signOut: () => Promise<void>;
  deleteUserAccount: () => Promise<void | AuthError>;
  updateUserProfile: (authData: AuthProfileUpdateData, profileData: Omit<Partial<UserProfile>, 'uid' | 'createdAt'>) => Promise<void | AuthError>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const { auth } = initializeFirebase();

// The user with this email will be designated as an admin.
const ADMIN_EMAIL = 'z1mmerman@yahoo.com';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUserData = useCallback(async (user: User | null) => {
    if (user) {
      let profile = await getUserProfile(user.uid);
      if (!profile) {
        // This case should ideally not be hit with the new signup flow, but is good for robustness.
        console.log(`No profile found for UID ${user.uid}. Creating one.`);
        const newProfileData = {
          email: user.email!, 
          displayName: user.displayName || user.email!.split('@')[0],
          photoURL: user.photoURL || ''
        };
        await createUserProfile(user.uid, newProfileData);
        profile = await getUserProfile(user.uid);
      }
      
      // Check if the current user is the designated admin
      if (user.email === ADMIN_EMAIL && profile?.role !== 'admin') {
        console.log(`Setting user ${user.email} as admin.`);
        await updateDbUserProfile(user.uid, { role: 'admin' });
        // Re-fetch the profile to get the updated role
        profile = await getUserProfile(user.uid);
      }

      setCurrentUser(user);
      setUserProfile(profile);
    } else {
      setCurrentUser(null);
      setUserProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      await refreshUserData(user);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [refreshUserData]);

  const signInWithEmail = async (data: SignInFormData): Promise<User | AuthError> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      return userCredential.user;
    } catch (error) {
      return error as AuthError;
    } finally {
        setLoading(false);
    }
  };

  const signUpWithEmail = async (data: SignUpFormData): Promise<User | AuthError> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateAuthProfile(user, { displayName: data.displayName });

      // Create Firestore profile
      await createUserProfile(user.uid, {
          email: data.email,
          displayName: data.displayName,
          photoURL: '', // No photo on signup
      });

      // Manually trigger a refresh to load the new profile into context
      await refreshUserData(user);

      return user;
    } catch (error) {
        return error as AuthError;
    } finally {
        setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      router.push('/'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async (): Promise<void | AuthError> => {
    const userToDelete = auth.currentUser;
    if (!userToDelete) {
        const err = new Error("User not authenticated for deletion.") as AuthError;
        err.code = "auth/no-current-user";
        return err;
    }
    setLoading(true);
    try {
        const userId = userToDelete.uid;
        // Delete from Auth
        await deleteUser(userToDelete);
        // Delete from Firestore
        await deleteUserProfile(userId);
        router.push('/');
    } catch (error) {
        console.error("Error deleting account:", error);
        // This might require re-authentication, which we'll let the user know.
        if ((error as AuthError).code === 'auth/requires-recent-login') {
            alert('This is a sensitive operation and requires you to have signed in recently. Please sign out, sign back in, and try again.');
        }
        return error as AuthError;
    } finally {
        setLoading(false);
    }
};

  
  const updateUserProfile = async (authData: AuthProfileUpdateData, profileData: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>): Promise<void | AuthError> => {
    if (!currentUser) {
      const err = new Error("User not authenticated for profile update.") as AuthError;
      err.code = "auth/no-current-user";
      return err;
    }
    setLoading(true);
    try {
      // Update Firebase Auth profile if data is provided
      if (Object.keys(authData).length > 0) {
        await updateAuthProfile(currentUser, authData);
      }
      
      // Update Firestore profile if data is provided
      if (Object.keys(profileData).length > 0) {
        await updateDbUserProfile(currentUser.uid, profileData);
      }
      
      // Force a refresh of the user and profile data to ensure context is up-to-date
      await currentUser.reload();
      await refreshUserData(auth.currentUser);

    } catch (error) {
      console.error("Error updating profile in AuthContext:", error);
      return error as AuthError;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    deleteUserAccount,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
