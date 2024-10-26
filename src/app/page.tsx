"use client"; // クライアントコンポーネントとして指定

import { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import GoogleImageGrid from '../../components/GoogleImageGrid';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 検索キーワードを設定する関数
  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Google画像検索</h1>
      <SearchForm onSubmit={handleSearchSubmit} /> {/* onSubmitを正しく渡す */}
      <div className="mt-8">
        <GoogleImageGrid searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;