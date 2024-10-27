import { Timestamp } from 'firebase-admin/firestore';
import db from './firebase'; // firebase.ts からインポート
import { collection, getDocs } from 'firebase/firestore';
import { initFirestore } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

export interface ClothingItem {
   id: string; // Firestore のドキュメント ID
   word: string;
   data: string;
}

export const getClothingItems = async (): Promise<ClothingItem[]> => {
   const collectionRef = collection(db, 'clothingItems');
   const querySnapshot = await getDocs(collectionRef);
   const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   })) as ClothingItem[]; // 型を明示的に指定
   return items;
};

export const firestore = initFirestore({
   credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
   }),
});
