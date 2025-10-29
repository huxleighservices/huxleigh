'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const hyperlinkSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export async function createHyperlink(prevState: any, formData: FormData) {
  const { firestore } = initializeFirebase();
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
  const hyperlinksRef = collection(firestore, 'hyperlinks');

  try {
    await addDoc(hyperlinksRef, {
      name,
      url,
      createdAt: serverTimestamp(),
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
    const { firestore } = initializeFirebase();
    if (!id) {
        throw new Error("No ID provided for deletion.");
    }
    const hyperlinkRef = doc(firestore, 'hyperlinks', id);

    try {
        await deleteDoc(hyperlinkRef);
        revalidatePath('/company/staff/resources');
    } catch (error: any) {
        console.error('Error deleting hyperlink:', error);
        throw new Error(error.message || "Could not delete hyperlink.");
    }
}
