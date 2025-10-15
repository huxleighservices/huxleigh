
'use client';

import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  displayName_lowercase: string;
  email: string;
  photoURL?: string | null;
}

export function useUserProfile(uid: string | undefined) {
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !uid) return null;
    return doc(firestore, 'users', uid);
  }, [firestore, uid]);

  const {
    data: profile,
    isLoading,
    error,
  } = useDoc<UserProfile>(userProfileRef);

  return { profile, isLoading, error };
}
