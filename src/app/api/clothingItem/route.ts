import { authOptions } from '@/lib/auth-options';
import db from '@/lib/firebase';
import { clothingItem } from '@/types/clothingItem';
import { time } from 'console';
import { Timestamp } from 'firebase-admin/firestore';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/clothingItem

export async function GET() {
   const session = await getServerSession(authOptions);
   if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const { user } = session;

   try {
      // FirestoreのclothingItemsコレクションへの参照を作成
      const collectionRef = collection(db, 'clothingItems');
      // 自分のデータのみを取得
      const q = query(collectionRef, where('userId', '==', user.userId));
      // getDocsを使用してコレクションからドキュメントを取得
      const querySnapshot = await getDocs(q);
      // 自分のデータのみを取得
      const myData = querySnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(myData, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: 'Failed to GET database ClothingItems' }, { status: 500 });
   }
}

export async function POST(request: NextRequest) {
   const session = await getServerSession(authOptions);

   // ログインしていない場合はエラー
   if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
   const { user } = session;

   const data = await request.json();
   // リクエストボディにtermが含まれていない場合はエラー
   if (!data.term) {
      return NextResponse.json({ error: 'Missing term' }, { status: 400 });
   }

   const newClothingItem: clothingItem = {
      term: data.term,
      timestamp: serverTimestamp(),
      userId: user.userId,
   };

   try {
      console.log('newClothingItem:', newClothingItem);
      const collectionRef = collection(db, 'clothingItems');
      const postData = await addDoc(collectionRef, newClothingItem);
      return NextResponse.json(postData, { status: 201 });
   } catch (error) {
      return NextResponse.json({ error: 'Failed to POST database ClothingItems' }, { status: 500 });
   }
}
