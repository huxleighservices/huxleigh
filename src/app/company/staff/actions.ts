'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';
import { updateUserProfile as updateDbUserProfile } from '@/lib/firebase/firestore';

const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters.'),
  userId: z.string(),
});

export async function updateUserProfile(prevState: any, formData: FormData) {
  await initializeAdminApp();
  const auth = getAuth();

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
