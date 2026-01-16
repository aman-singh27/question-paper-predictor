import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK once
// Uses GOOGLE_APPLICATION_CREDENTIALS environment variable
// This supports both local dev and Cloud Functions deployment
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}

// Export Firestore instance
export const db = admin.firestore();

// Export admin instance for other uses
export { admin };
