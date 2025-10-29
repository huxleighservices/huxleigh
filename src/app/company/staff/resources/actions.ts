'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAdminApp } from '@/lib/firebase/admin';

const hyperlinkSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export async function createHyperlink(prevState: any, formData: FormData) {
  await initializeAdminApp();
  const firestore = getFirestore();

  const validatedFields = hyperlinkSchema.safeParse({
    name: formData.get('name'),
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, url } = validatedFields.data;
  const hyperlinksRef = firestore.collection('hyperlinks');

  try {
    await hyperlinksRef.add({
      name,
      url,
      createdAt: new Date(),
    });

    revalidatePath('/company/staff/resources');
    return {
      success: true,
      message: 'Hyperlink created successfully!',
      errors: null,
    };
  } catch (error: any) {
    console.error('Error creating hyperlink:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred.',
      errors: null,
    };
  }
}

export async function deleteHyperlink(id: string) {
    await initializeAdminApp();
    const firestore = getFirestore();

    if (!id) {
        throw new Error("No ID provided for deletion.");
    }
    const hyperlinkRef = firestore.collection('hyperlinks').doc(id);

    try {
        await hyperlinkRef.delete();
        revalidatePath('/company/staff/resources');
    } catch (error: any) {
        console.error('Error deleting hyperlink:', error);
        throw new Error(error.message || "Could not delete hyperlink.");
    }
}
