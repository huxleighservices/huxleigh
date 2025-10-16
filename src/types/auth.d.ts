
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

// B2B Trainer Types
export interface TrainingMessage {
    role: 'user' | 'ai';
    content: string;
}

export interface TrainingFeedback {
    overallAssessment: string;
    positivePoints: string[];
    areasForImprovement: string[];
}

export interface TrainingResult {
    id: string;
    phase: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    conversation: TrainingMessage[];
    feedback?: TrainingFeedback;
    completedAt: Timestamp;
}

export interface TrainingSession {
    id: string;
    userId: string;
    name: string;
    createdAt: Timestamp;
    results: TrainingResult[];
}
