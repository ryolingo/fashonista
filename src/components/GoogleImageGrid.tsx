import { useState, useEffect } from 'react';
import { fetchGoogleImages } from '../utils/fetchGoogleImages';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
type ImageType = {
   link: string;
   title: string;
};

const GoogleImageGrid = ({ searchTerm }: { searchTerm: string }) => {
   const [images, setImages] = useState<ImageType[]>([]);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (searchTerm) {
         fetchGoogleImages(searchTerm)
            .then((results) => setImages(results))
            .catch((err) => setError(err.message));
      }
   }, [searchTerm]);

   if (error) {
      return <p className='text-red-500'>Error: {error}</p>;
   }

   return (
      <ScrollArea className='w-full h-100 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-md border'>
         <div className='flex w-max h-80 space-x-4 bg-black py-1'>
            {images.map((image) => (
               <Card key={image.link} className='w-1/3 bg-gray-200 rounded-lg overflow-hidden mx-2'>
                  <img src={image.link} alt={image.title} className='w-full h-full object-cover' />
               </Card>
            ))}
         </div>
         <ScrollBar orientation='horizontal' />
      </ScrollArea>
   );
};

export default GoogleImageGrid;
