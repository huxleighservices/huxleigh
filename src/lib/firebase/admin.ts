'use server';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

let adminApp: App | null = null;

export async function initializeAdminApp() {
  if (adminApp) {
    return adminApp;
  }
  
  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }

  try {
     const parsedKey = JSON.parse(serviceAccountKey);
     adminApp = initializeApp({
        credential: credential.cert(parsedKey),
     });
     return adminApp;
  } catch (error) {
    console.error("Failed to parse Firebase service account key:", error);
    throw new Error("The Firebase service account key is not valid JSON.");
  }
}
