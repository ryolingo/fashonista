// components/SearchForm.tsx
"use client";

import { useState } from 'react';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Google画像検索のURLにリダイレクト
      const googleImageSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTerm)}`;
      window.location.href = googleImageSearchUrl;
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="検索キーワードを入力"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        検索
      </button>
    </form>
  );
};

export default SearchForm;
