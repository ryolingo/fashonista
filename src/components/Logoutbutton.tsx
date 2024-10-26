'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function LogoutButton({ iconUrl }: { iconUrl: string }) {
   return (
      <button onClick={() => signOut({ callbackUrl: '/' })}>
         <Image
            src={iconUrl} // アイコン画像のURL
            alt='Icon Image' // 画像の代替テキスト
            width={50} // 適切な幅
            height={50} // 適切な高さ
            className='rounded-full mr-5' // クラス名を正しく修正
         />
      </button>
   );
}
