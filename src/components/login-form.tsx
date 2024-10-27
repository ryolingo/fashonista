'use client';

import { signIn } from 'next-auth/react';
import { buttonVariants } from './ui/button';
import { Icon } from '@/components/icon';
import { useState } from 'react';

export default function LoginForm() {
   const [loading, setLoading] = useState(false);
   const handleGoogleLogin = () => {
      setLoading(true);
      signIn('google', { callbackUrl: '/mypage' });
   };
   return (
      <div className='h-[500px] w-[300px] bg-white rounded-3xl'>
         <div className='text-center mt-28 space-y-5'>
            <h1 className='text-4xl font-extrabold'>Fashionista</h1>
            <p className='text-2xl font-semibold'>Googleでログイン</p>
            <button
               className={buttonVariants({ variant: 'secondary' })}
               onClick={handleGoogleLogin}
            >
               <span className='mr-3'>
                  {loading ? <Icon.spinner className='animate-spin' /> : <Icon.google />}
               </span>
               Google
            </button>
         </div>
      </div>
   );
}
