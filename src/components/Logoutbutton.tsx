'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
   return (
      <button
         onClick={() => signOut({ callbackUrl: '/' })}
         className='border rounded-md bg-blue-200 hover:bg-blue-300'
      >
         サインアウト
      </button>
   );
}
