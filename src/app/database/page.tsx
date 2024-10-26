// src/database/page.tsx
"use client"; // これを追加

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Firestoreの関数をインポート
import db from "../../lib/firebase"; // Firebaseの設定を行ったファイルをインポート

interface TestData {
  id: string; // ドキュメントのID
  text: string; // フィールド 'text'
  number: number; // フィールド 'number'
}

function DataPage() {
  const [blogs, setBlogs] = useState<TestData[]>([]); // Stateを初期化

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "test")); // 'test' コレクションからデータを取得
        const data = snapshot.docs.map((doc) => ({
          id: doc.id, // ドキュメントのIDを取得
          ...doc.data(), // データを展開
        })) as TestData[]; // 型を指定
        setBlogs(data); // Stateを更新
      } catch (error) {
        console.error("Error fetching documents: ", error); // エラーハンドリング
      }
    };

    fetchData(); // データを取得する関数を実行
  }, []); // コンポーネントがマウントされたときに実行

  return (
    <div>
      <h1>Data</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.text}</h2> {/* textフィールドを表示 */}
          <p>{blog.number}</p> {/* numberフィールドを表示 */}
        </div>
      ))}
    </div>
  );
}

export default DataPage;
