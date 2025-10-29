'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App, credential } from 'firebase-admin/app';

const hyperlinkSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

async function initializeAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
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


export async function createHyperlink(prevState: any, formData: FormData) {
  const adminApp = await initializeAdminApp();
  if (!adminApp) {
    return {
      success: false,
      message: 'Server configuration error: Firebase Admin SDK could not be initialized. Please contact support.',
      errors: null,
    };
  }
  
  const firestore = getFirestore(adminApp);

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
    const adminApp = await initializeAdminApp();
    if (!adminApp) {
       throw new Error('Server configuration error: Firebase Admin SDK could not be initialized.');
    }
    const firestore = getFirestore(adminApp);

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
