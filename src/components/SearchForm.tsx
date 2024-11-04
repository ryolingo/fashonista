'use client'; // クライアントコンポーネントとして指定

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
      <div className='flex justify-center'>
         <form onSubmit={handleSearch} className='flex items-center w-1/2'>
            <input
               type='text'
               placeholder='検索キーワードを入力'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className='border px-4 py-2 rounded w-full'
            />
            <button type='submit' className={cn(buttonVariants(), 'ml-7 w-24')}>
               検索
            </button>
         </form>
      </div>
   );
};

export default SearchForm;
