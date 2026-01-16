import * as admin from 'firebase-admin';
import * as path from 'path';

// Path to service account key
const serviceAccountPath = path.join(__dirname, '../../hack-f1811-firebase-adminsdk-fbsvc-55f630c82e.json');

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
    });
}

// Export Firestore instance
export const db = admin.firestore();

// Export admin instance for other uses
export { admin };
