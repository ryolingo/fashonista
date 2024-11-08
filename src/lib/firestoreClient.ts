import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';

interface ClothingItem {
   id: string;
   term: string;
   timestamp: string;
   user: string;
}
export const fetchClothingItems = async (): Promise<ClothingItem[]> => {
   try {
      // FirestoreのclothingItemsコレクションへの参照を作成
      const collectionRef = collection(db, 'clothingItems');

      // getDocsを使用してコレクションからドキュメントを取得
      const querySnapshot = await getDocs(collectionRef);

      // 取得したドキュメントを配列に変換
      const items = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...(doc.data() as Omit<ClothingItem, 'id'>), // 型を明示的に指定
      }));

      console.log('取得したデータ:', items);
      return items;
   } catch (error) {
      console.error('データの取得に失敗しました:', error);
      return [];
   }
};
