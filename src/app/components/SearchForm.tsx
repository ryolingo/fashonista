'use client2'; // クライアントコンポーネントとして指定

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type SearchFormProps = {
   onSubmit: (term: string) => void;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
         onSubmit(searchTerm); // ここでonSubmitを呼び出す
      }
   };

   return (
      <form onSubmit={handleSearch}>
         <input
            type='text'
            placeholder='検索キーワードを入力'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border px-4 py-2 rounded '
         />
         <button type='submit' className={cn(buttonVariants(), 'ml-7')}>
            検索
         </button>
      </form>
   );
};

export default SearchForm;
