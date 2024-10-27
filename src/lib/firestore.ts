
import db from './firebase'; // firebase.ts からインポート
import { collection, getDocs } from 'firebase/firestore';

export interface ClothingItem {
  id: string; // Firestore のドキュメント ID
  name: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  dateAdded: string;
}

export const getClothingItems = async (): Promise<ClothingItem[]> => {
  const collectionRef = collection(db, 'clothingItems');
  const querySnapshot = await getDocs(collectionRef);
  const items = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ClothingItem[]; // 型を明示的に指定
  return items;
};
