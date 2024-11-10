'use client'; // クライアントコンポーネントとして指定

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ImageType } from '@/types/GoogleImages';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

interface SearchFormProps {
   setError: Dispatch<SetStateAction<string | null>>;
   setImages: Dispatch<SetStateAction<ImageType[]>>;
}

const SearchForm = ({ setError, setImages }: SearchFormProps) => {
   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
         // 画像の取得
         try {
            console.log('searchTerm:', searchTerm);
            const response = await axios.get(`/api/google/Images/${searchTerm}`);
            setImages(response.data.items);
         } catch (error) {
            setError('画像の取得に失敗しました。');
         }

         // データベースに保存
         try {
            axios.post('/api/clothingItem', { term: searchTerm });
         } catch (error) {}
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
