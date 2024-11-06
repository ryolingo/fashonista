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

      <form onSubmit={handleSearch}>
         <div className='flex justify-center gap-4 mb-8'>
            <input
               type='text'
               placeholder='例：秋服　男　大学生　パーカー'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className='w-72 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md'
            />
            <button type='submit' className={cn(buttonVariants())}>
               検索
            </button>
         </div>
      </form>

   );
};

export default SearchForm;
