'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, App, credential } from 'firebase-admin/app';
import { updateUserProfile as updateDbUserProfile } from '@/lib/firebase/firestore';

async function initializeAdminApp(): Promise<App | null> {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.error('Firebase service account key is not available.');
    return null;
  }

  try {
    const parsedKey = JSON.parse(serviceAccountKey);
    const app = initializeApp({
      credential: credential.cert(parsedKey),
    });
    return app;
  } catch (error) {
    console.error('Failed to parse or initialize Firebase Admin SDK:', error);
    return null;
  }
}

const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters.'),
  userId: z.string(),
});

export async function updateUserProfile(prevState: any, formData: FormData) {
  const adminApp = await initializeAdminApp();
  if (!adminApp) {
    return {
      success: false,
      message: 'Server configuration error. Please contact support.',
      errors: {},
    };
  }
  const auth = getAuth(adminApp);

  const validatedFields = updateProfileSchema.safeParse({
    displayName: formData.get('displayName'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { displayName, userId } = validatedFields.data;

  try {
    // Update Firebase Auth
    await auth.updateUser(userId, {
      displayName: displayName,
    });

    // Update Firestore profile
    await updateDbUserProfile(userId, {
      displayName: displayName,
    });

    revalidatePath('/company/staff');

    return {
      success: true,
      message: 'Profile updated successfully!',
    };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred.',
    };
  }
}
