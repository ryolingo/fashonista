'use client';
import Header from '@/components/header';
import LoginForm from '@/components/login-form';

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
