// src/app/page.tsx
"use client";

import { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import ImageGrid from '../../components/ImageGrid';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Google検索と画像取得アプリ</h1>
      <SearchForm />
      <div className="mt-8">
        <ImageGrid searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
