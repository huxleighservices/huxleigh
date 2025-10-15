
import type { Timestamp } from 'firebase/firestore';

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  displayName: string;
}


export interface AuthProfileUpdateData {
  displayName?: string;
  photoURL?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  displayName_lowercase: string;
  email: string;
  photoURL?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  role?: 'admin' | 'user';
}

export interface Hyperlink {
  id: string;
  title: string;
  url: string;
  createdAt: Timestamp;
  creatorId: string;
}
