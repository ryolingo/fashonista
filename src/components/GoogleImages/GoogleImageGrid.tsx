import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { ImageType } from '@/types/GoogleImages';

interface GoogleImageGridProps {
   error: string | null;
   images: ImageType[];
}

const GoogleImageGrid = ({ error, images }: GoogleImageGridProps) => {
   if (error) {
      return <p className='text-red-500'>Error: {error}</p>;
   }

   return (
      <ScrollArea className='w-full h-[500px] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-md border'>
         <div className='flex w-max h-[450px] space-x-6 py-2'>
            {images &&
               images.map((image) => (
                  <Card
                     key={image.link}
                     className='w-[300px] h-full bg-gray-800 rounded-lg overflow-hidden mx-3 mt-5'
                  >
                     <img
                        src={image.link}
                        alt={image.title}
                        className='w-full h-full object-cover'
                     />
                  </Card>
               ))}
         </div>
         <ScrollBar orientation='horizontal' />
      </ScrollArea>
   );
};

export default GoogleImageGrid;
