'use server';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

let adminApp: App | null = null;

export async function initializeAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }

  try {
    const parsedKey = JSON.parse(serviceAccountKey);
    const app = initializeApp({
      credential: credential.cert(parsedKey),
    });
    return app;
  } catch (error) {
    console.error('Failed to parse or initialize Firebase Admin SDK:', error);
    throw new Error('The Firebase service account key is not configured correctly.');
  }
}
