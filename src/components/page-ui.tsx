import { CalendarIcon, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export default function Page_UI() {
   return (
      <div className='flex flex-col h-screen w-[1500px] bg-black text-white'>
         <header className='flex justify-between items-center p-4 border-b border-gray-800'>
            <h1 className='text-xl font-bold'>Fashionista</h1>
            <Button variant='ghost' size='icon' className='rounded-full'>
               <MoreVertical className='h-6 w-6' />
            </Button>
         </header>

         <main className='flex-1 '>
            <div className='relative h-64 bg-gray-800 flex items-center justify-center'>
               <div className='text-center'>
                  <div className='text-4xl font-light'>10/20 15:21</div>
                  <div className='mt-2 text-sm text-gray-400'>ここにテキストが入ります</div>
               </div>
            </div>

            <section className='p-4'>
               <h2 className='text-lg font-semibold mb-2'>Fashion Snap</h2>
               <div className='grid grid-cols-2 gap-2'>
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className='aspect-square bg-gray-800 rounded-lg' />
                  ))}
               </div>
            </section>

            <section className='p-4'>
               <h2 className='text-lg font-semibold mb-2'>My Collection</h2>
               <div className='grid grid-cols-2 gap-4'>
                  <div className='aspect-square bg-gray-800 rounded-lg' />
                  <Calendar className='rounded-lg bg-gray-800 p-3' />
               </div>
            </section>
         </main>
      </div>
   );
}
