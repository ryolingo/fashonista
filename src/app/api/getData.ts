// pages/api/getData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import  db from '../../lib/firebase'; // firebase設定ファイルをインポート
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const querySnapshot = await getDocs(collection(db, 'test')); // コレクション名を指定
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // ドキュメントのデータを取得
    res.status(200).json(data); // JSON形式でデータを返す
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
