import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      onSearch(keyword);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for images..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
