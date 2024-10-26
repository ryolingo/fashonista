import { initFirestore } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

export const firestore = initFirestore({
   credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
   }),
});
