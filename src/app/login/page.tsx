'use client';

import Header from '@/components/header';
import LoginForm from '@/components/login-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';

export default function login() {
   return (
      <>
         <Header />
         <div className='bg-purple-500 min-h-screen'>
            <div className='pt-16 flex justify-center'>
               <LoginForm />
            </div>
         </div>
      </>
   );
}
