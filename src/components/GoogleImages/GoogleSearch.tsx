import { useState } from 'react';
import GoogleImageGrid from './GoogleImageGrid';
import SearchForm from './SearchForm';
import { ImageType } from '@/types/GoogleImages';

export default function GoogleSearch() {
   const [error, setError] = useState<string | null>(null);
   const [images, setImages] = useState<ImageType[]>([]);

   return (
      <>
         <div className='flex items-center gap-4 mb-5'>
            <h2 className='text-3xl font-bold text-primary mb-7 pl-60'>何を着よう？</h2>
            <div className='flex items-center'>
               <SearchForm setError={setError} setImages={setImages} />
            </div>
         </div>
         <div className='mt-8'>
            <GoogleImageGrid error={error} images={images} />
         </div>
      </>
   );
}
