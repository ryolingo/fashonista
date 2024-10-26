import LogoutButton from '@/components/Logoutbutton';
import { getCurrentUser } from '@/lib/session';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function mypage() {
   const currentUser = await getCurrentUser();
   if (!currentUser) {
      redirect('/login');
   }
   return (
      <div className='mt-20 flex justify-center'>
         <div className='grid gap-5 text-center'>
            <h1 className='text-2xl font-extrabold'>This is My Page</h1>
            <p className='text-xl'>hello {currentUser.name}</p>
            {currentUser.image && (
               <Image
                  src={currentUser.image}
                  width={100}
                  height={100}
                  alt='image'
                  className='rounded-full ml-9'
               />
            )}
            <LogoutButton />
         </div>
      </div>
   );
}
