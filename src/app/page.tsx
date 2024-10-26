import Link from 'next/link';

export default function Home() {
   return (
      <div className=' mt-20 flex justify-center'>
         <div className=''>
            <div className='grid gap-6 text-center'>
               <h1 className='text-2xl font-extrabold'>Home Page</h1>
               <Link href={'/login'} className='border rounded-md bg-blue-200 hover:bg-blue-300'>
                  ログイン
               </Link>
            </div>
         </div>
      </div>
   );
}
